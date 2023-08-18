from flask import Blueprint, jsonify, session, request
from app.forms import PostForm  
from app.models import User, db, Post
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from datetime import datetime
from flask_login import login_required, current_user

post_routes = Blueprint('post', __name__)


@post_routes.route('/feed')
@login_required
def get_posts():
    
#query the Post table for all posts
    all_posts = Post.query.all()

#loop through the list of posts and return each post as a dictionary 
    post_detail = [post.to_dict() for post in all_posts]

    return post_detail


@post_routes.route('/<int:post_id>')
@login_required
def get_post(post_id):

#query the Post table for the id requested in the URL    
    post = Post.query.get(post_id)

#if that id exists turn it into a dictionary
    if post:
        singlePost = post.to_dict()

#from the singlepost at the user_id attribute return the information related to the user 
#there is a one to many relationship between Users and Posts  

    user = post.user
    singlePost['user_id'] = {
        'user_id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'occupation': user.occupation,
        'profile_image': user.profile_image
    }
    return singlePost



@post_routes.route('/feed/new', methods = ['POST'])
@login_required
def create_post():
    form = PostForm()
    form.csrf_token.data = request.cookies.get('csrf_token')
    upload = {'url': None} 

#aws biolerplate for post_images

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

    #create a new instance for the Post table using the PostForm class

        new_post = Post(
            title=form.title.data,
            body=form.body.data,
            post_images=upload['url'] if image else None,  
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    #append the new_post instance into the db
    # turn the instance into a dictionary(serialize)

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    
    #if errors return the form errors/validations
    else:       
        return {"errors": form.errors}, 400

   
### User post



### Update post

@post_routes.route('/<int:id>', methods = ['PUT'])
@login_required

def update_post(id):

#query Post table for id being requested
#grab the information from the db 
    post = Post.query.get(id)
    data = request.form
    title = data.get('title')
    body = data.get('body')
    post_images = request.files.get('post_images')
#in the front end if an remove_image_request is being made grab the post_image that is already in the db
    remove_image_request = data.get('post_images')

    
    if post:
#in the front end there is a 'remove_image function' that deletes the image from db
        if remove_image_request == 'remove_image':
            if post.post_images:
                remove_file_from_s3(post.post_images)
#if the image is removed then let aws know there is no URL and set the post.post_images to None
            post.post_images = None  
        
#if the image is not being removed and just replaced set the new image to the new url
        elif post_images:
            if post.post_images:
                remove_file_from_s3(post.post_images)

            post_images.filename = get_unique_filename(post_images.filename)
            upload = upload_file_to_s3(post_images)

            if "url" not in upload:
                return {'error': upload['errors']}

            post.post_images = upload['url']

#if title or body return the new information and commit it to db

        if title:
            post.title = title

        if body:
            post.body = body

        db.session.commit()
        return post.to_dict()

    return {'message': 'Post not found'}, 404




@post_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_post(id):

#delete postId being requested from the db after quering and checking if exists
    post = Post.query.get(id)
    if post.id:

        db.session.delete(post)
    db.session.commit()

    return {'message': 'Post Successfully Deleted'}, 200