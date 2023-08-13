from flask import Blueprint, jsonify, session, request
from app.forms import CommentForm
from app.models import User, db, Post, Comment
# from ..api.aws_helpers import get_unique_filename, upload_file_to_s3
from datetime import datetime
from flask_login import login_required, current_user


comment_routes = Blueprint('comment', __name__)


## All comments for a post 

@comment_routes.route('/')
@login_required
def get_comments():


    all_comments = Comment.query.all()
    comments = [comment.to_dict() for comment in all_comments]
    print('IS THIS EVERYTHING  ----------->', comments)

    # for comment in comments:
           
    #        user_post_comment = comment['user_id']
    #        user = User.query.get(user_post_comment)
    #        user_comment = user.to_dict()
    #        comment['first_name'] = user_comment['first_name']
    #        comment['last_name'] = user_comment['last_name']
    #        comment['profile_name'] = user_comment['profile_name']


     
    
    return comments, 200


## Get user's comments 
@comment_routes.route('/user')
@login_required
def get_comment_user():


    
    user_comment = Comment.query.filter_by(user_id=current_user.id).all()
    posts = [comment.post_id for comment in user_comment]  
    commented_posts = Post.query.filter(Post.id.in_(posts)).all()
    post_details = {post.id: post.to_dict() for post in commented_posts}
    print("---------->", user_comment)

    comments_with_posts = [
        {
            'comment_id': comment.id,
            'post': post_details[comment.post]
        }
        for comment in user_comment
    ]

    return {'comments_with_posts': comments_with_posts}, 200


## Create comments for a post 

@comment_routes.route('/<int:post_id>', methods = ['POST'])
@login_required
def create_comment(post_id):
    form = CommentForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
     
        
        new_comment = Comment(
            body=form.body.data,
            post_id = post_id, 
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict()), 201
    




## Update user's comments for a post 


# @comment_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_comment(id):
#     edit_comment = Comment.query.get(id)

    
#     if edit_comment.id != id:
#             return {'message': 'comment not found'}, 404
#     if edit_comment.user_id != current_user.id:
#         return {'message': 'Unauthorized.'}, 401
    


#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']


#     if form.validate_on_submit():
#         edit_comment.body = form.data['body']
#         edit_comment.updated_at = datetime.now()
#         db.session.commit()

#         return edit_comment.to_dict(), 200

#     return {'message': form.errors}, 401




## Delete comments 

@comment_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment.id:

        db.session.delete(comment)
    db.session.commit()

    return {'message': 'Comment Successfully Deleted'}, 200
     
