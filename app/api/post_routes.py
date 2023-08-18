from flask import Blueprint, jsonify, session, request
from app.forms import PostForm  
from app.models import User, db, Post
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
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

## - Get posts by Id

@post_routes.route('/<int:post_id>')
@login_required
def get_post(post_id):
    
    post = Post.query.get(post_id)

    if post:
        singlePost = post.to_dict()

    user = post.user
    singlePost['user_id'] = {
        'user_id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'occupation': user.occupation,
        'profile_image': user.profile_image
    }


    return singlePost


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
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
                return upload['errors']
         
        print("Form data - title:----------->", form.title.data)
        print("Form data - body:------------>", form.body.data)

        new_post = Post(
            title=form.title.data,
            body=form.body.data,
            post_images=upload['url'] if image else None,  
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    else:       
        return {"errors": form.errors}, 400

   
### User post



### Update post

@post_routes.route('/<int:id>', methods = ['PUT'])
@login_required

def update_post(id):

    
    post = Post.query.get(id)
    data = request.form
    title = data.get('title')
    body = data.get('body')
    post_images = request.files.get('post_images')
    remove_image_request = data.get('post_images')  # check here

    
    if post:
        # Check if 'remove_image' is received from frontend
        if remove_image_request == 'remove_image':
            if post.post_images:
                remove_file_from_s3(post.post_images)
            post.post_images = None  # remove the image link from the database
        
        # Upload new image logic
        elif post_images:
            if post.post_images:
                remove_file_from_s3(post.post_images)

            post_images.filename = get_unique_filename(post_images.filename)
            upload = upload_file_to_s3(post_images)

            if "url" not in upload:
                return {'error': upload['errors']}

            post.post_images = upload['url']

        if title:
            post.title = title

        if body:
            post.body = body

        db.session.commit()
        return post.to_dict()

    return {'message': 'Post not found'}, 404


### delete post 

@post_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post.id:

        db.session.delete(post)
    db.session.commit()

    return {'message': 'Post Successfully Deleted'}, 200