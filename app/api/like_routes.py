from flask import Blueprint, jsonify, session, request
#from app.forms import CommentForm
from app.models import User, db, Post, Comment, Like
# from ..api.aws_helpers import get_unique_filename, upload_file_to_s3
from datetime import datetime
from flask_login import login_required, current_user


like_routes = Blueprint('like', __name__)


@like_routes.route('/')
@login_required
def get_like():


    all_likes = Like.query.all()
    likes = [like.to_dict() for like in all_likes]
    
    return likes, 200

## Get liked posts of user 

@like_routes.route('/user')
@login_required
def get_like_user():
     
    user_id = current_user.id
    liked_posts = db.session.query(Like, Post).join(Post, Post.id == Like.post_id).filter(Like.user_id == user_id).all()

    likes_with_posts = [
        {
            'like_id': like.id,
            'post': post.to_dict()
        }
        for like, post in liked_posts
    ]

    return {'likes_with_posts': likes_with_posts}, 200


    # user_id = current_user.id
    # user_likes = Like.query.filter_by(user_id=user_id).all()
    # posts = [like.post_id for like in user_likes]  
    # liked_posts = Post.query.filter(Post.id.in_(posts)).all()
    # post_details = {post.id: post.to_dict() for post in liked_posts}

    # likes_with_posts = [
    #     {
    #         'like_id': like.id,
    #         'post': post_details[like.post_id]
    #     }
    #     for like in user_likes
    # ]

    # return {'likes_with_posts': likes_with_posts}, 200
 

@like_routes.route('/<int:post_id>',  methods= ['POST'])
@login_required
def create_like(post_id):


    post_likes = Post.query.get(post_id)

    for like in post_likes.likes:
        if like.user_id == current_user.id:
            return {'message': "Already liked this post"}, 400

    if post_likes.id != post_id:
            return {'message': 'post not found'}, 404
    


    like = Like(
        post_id=post_likes.id,
        user_id=current_user.id
    )

    db.session.add(like)
    db.session.commit()
    
    return {'message': 'Like created successfully'}, 201


## Delete Like 
@like_routes.route('/<int:post_id>',  methods= ['DELETE'])
@login_required
def delete_like(post_id):


    post_likes = Post.query.get(post_id)

    if post_likes.id != post_id:
            return {'message': 'post not found'}, 404
    like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    if not like:
         return {'message': 'Like not found'}, 404

    db.session.delete(like)
    db.session.commit()
            

    return {'message': 'Like deleted successfully'}, 201

