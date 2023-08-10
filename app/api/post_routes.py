from flask import Blueprint, jsonify, session, request
from app.forms import PostForm  
from app.models import User, db, Post
from .aws_helpers import get_unique_filename, upload_file_to_s3
from datetime import datetime
from flask_login import login_required, current_user

post_routes = Blueprint('post', __name__)


#### All post
# - Get all posts including comments, likes, and the user it belongs t0

@post_routes.route('/feed')
@login_required
def get_posts():
    
    all_posts = Post.query.all()
    post_detail = [post.to_dict() for post in all_posts]

    return post_detail



### Create post
# - Similar to sign up  
     # image_url = upload['url']
    # else:
    #         image_url = None


@post_routes.route('/feed/new', methods = ['POST'])
@login_required
def create_post():
    form = PostForm()
    form.csrf_token.data = request.cookies.get('csrf_token')
    upload = {'url': None} 

    if form.validate_on_submit():
            
            image = form.data["post_images"] 
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
                return  upload['errors']
       
         
    print("Form data - title:----------->", form.title.data)
    print("Form data - body:------------>", form.body.data)


    new_post = Post(
        
        title=form.title.data,
        body=form.body.data,
        post_images=upload['url'],  
        user_id=current_user.id,
        created_at=datetime.now(),
        updated_at=datetime.now()
        )

    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict(), 201

   
### User post



### Update post

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post(id):
    edit_post = Post.query.get(id)

    
    if edit_post.id != id:
            return {'message': 'Post not found'}, 404
    if edit_post.user_id != current_user.id:
        return {'message': 'Unauthorized.'}, 401

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
     
    if form.validate_on_submit():
        image = form.post_image.data  

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify({'error': upload['errors']})

    if form.validate_on_submit():
        edit_post.title = form.data['title']
        edit_post.body = form.data['body']
        edit_post.post_image = form.data['post_image']
        edit_post.updated_at = datetime.now()
        db.session.commit()

        return edit_post.to_dict(), 200

    return {'message': form.errors}, 401
    



### delete post 

@post_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post.id:

        db.session.delete(post)
    db.session.commit()

    return {'message': 'Post Successfully Deleted'}, 200