from flask import Blueprint, jsonify, session, request
from app.forms import CommentForm
from app.models import User, db, Post, Comment
# from ..api.aws_helpers import get_unique_filename, upload_file_to_s3
from datetime import datetime
from flask_login import login_required, current_user


comment_routes = Blueprint('comment', __name__)


@comment_routes.route('/')
@login_required
def get_comments():

#return all comments query and turn into dictionaries
    all_comments = Comment.query.all()
    comments = [comment.to_dict() for comment in all_comments]
    print('IS THIS EVERYTHING  ----------->', comments)

    return comments, 200


## Get user's comments 
@comment_routes.route('/user')
@login_required
def get_comment_user():


#Query 1 - search the Comment table and filter by the userId matching the session user
#return the list of all comments made by user
    user_comment = Comment.query.filter_by(user_id=current_user.id).all()
#loop through the list and return the post_ids
    posts = [comment.post_id for comment in user_comment]  

#Query 2 - search the Post table and filter by the post_id's IN the first query
#loop through the list and turn them into dictionaries
#the post.id returns literally everything that is associated with the post in the for loop
    commented_posts = Post.query.filter(Post.id.in_(posts)).all()
    post_details = {post.id: post.to_dict() for post in commented_posts}
    print("---------->", user_comment)

    
    return post_details, 200


## Create comments for a post 

@comment_routes.route('/<int:post_id>', methods = ['POST'])
# @login_required
def create_comment(post_id):
    form = CommentForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
    
    #create a new instance for the Comment class
        
        new_comment = Comment(
            body=form.body.data,
            post_id = post_id, 
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    #add to db, commit, and turn into a dictionary(serialize)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201
    






@comment_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):

#query Comment table for the comment 
    comment = Comment.query.get(id)
#get the informatio from the request
    data = request.form
    body = data.get('body')

#update db with new response, commit and to_dict

    if body:
        comment.body = body
        db.session.commit()
        return comment.to_dict()



## Delete comments 

@comment_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_comment(id):

#delete comment from db
    comment = Comment.query.get(id)
    if comment.id:

        db.session.delete(comment)
    db.session.commit()

    return {'message': 'Comment Successfully Deleted'}, 200
     
