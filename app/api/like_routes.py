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

#search for likes, loop through all likes and turn them into dictionairs 
    all_likes = Like.query.all()
    likes = [like.to_dict() for like in all_likes]
    
    return likes, 200



@like_routes.route('/user')
@login_required
def get_like_user():
     

#Query 1 - search the Like table and filter by the userId matching the session user
#return the list of all likes made by user
    user_likes = Like.query.filter_by(user_id=current_user.id).all()
#loop through the list(user_likes) and return the post_ids
    posts = [like.post_id for like in user_likes]

#Query 2 - search the Post table and filter by the post_id's IN the first query
#loop through the list(liked_posts ) and turn them into dictionaries
#the post.id returns literally everything that is associated with the post in the for loop
    liked_posts = Post.query.filter(Post.id.in_(posts)).all()
    post_details = {post.id: post.to_dict() for post in liked_posts}

  
    return  post_details, 200
 

@like_routes.route('/<int:post_id>',  methods= ['POST'])
@login_required
def create_like(post_id):

#query through Post table by the post_id in the url
    post_likes = Post.query.get(post_id)

#if posts doesn't exist return error 
    if post_likes.id != post_id:
        return {'message': 'post not found'}, 404
    

#loop through the post returned by likes
#there is a relationship between likes and posts 
#if there is a user_id in the likes table that matches the session user return error 
    for like in post_likes.likes:
        if like.user_id == current_user.id:
            return {'message': "Already liked this post"}, 400

#if the conditional doesn't come back a truthy then create a new instance in the Like Class and add it to db
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
    
#query through Like table and check to see if the postId requested is the current postId
#and if the user_id is the session userId. there should only be one attribute
    like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    
#if not found then can't delete a like that aint there
    if not like:
         return {'message': 'Like not found'}, 404
    
#if found delete like from db
    db.session.delete(like)
    db.session.commit()
            

    return {'message': 'Like deleted successfully'}, 201

