from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
# from app.forms import EditUserForm

from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


user_routes = Blueprint('users', __name__)



def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return [user.to_dict() for user in users]



@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    data = request.form
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    profile_image = request.files.get('profile_image')
    occupation = data.get('occupation')
    biography = data.get('biography')
    city = data.get('city')
    state = data.get('state')  

    if user:
        if profile_image:
            remove_file_from_s3(user.profile_image)

            profile_image.filename = get_unique_filename(profile_image.filename)
            upload = upload_file_to_s3(profile_image)
            user.profile_image = upload['url']
            if "url" not in upload:
                return {'error': upload['errors']}

        user.first_name = first_name
        user.last_name = last_name
        user.occupation = occupation
        user.biography = biography
        user.city = city
        user.state = state
       
        db.session.commit()
        return user.to_dict()
    return {'Message': 'User Information was successfully updated'}


@user_routes.route('/<int:id>', methods=['Delete'])
@login_required
def delete_user(id):
    user = User.query.get(id)
    if user.id:

        db.session.delete(user)
    db.session.commit()

    return {'User Successfully Deleted': id}


@user_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def follow(id):

    try:
        user_to_follow = User.query.get(id)
        
        # Check if the user exists
        if not user_to_follow:
            return {'errors': 'User not found'}, 404

        # Ensure the current user isn't trying to follow themselves
        if current_user.id == user_to_follow.id:
            return {'errors': 'You cannot follow yourself'}, 400
        
        # Check if the user is already being followed
        if current_user.is_following(user_to_follow):
            return {'errors': 'You are already following this user'}, 400

        current_user.follow(user_to_follow)
        db.session.commit()

        return jsonify({
            'message': 'Successfully followed the user',
            'user': current_user.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return {'errors': 'Error occurred during the follow operation', 'message': str(e)}, 500


@user_routes.route('/<int:id>/unfollow', methods=['DELETE'])
@login_required
def unfollow(id):

    try:
        user_to_unfollow = User.query.get(id)
        
        # Check if the user exists
        if not user_to_unfollow:
            return {'errors': 'User not found'}, 404

        # Ensure the current user isn't trying to unfollow themselves
        if current_user.id == user_to_unfollow.id:
            return {'errors': 'You cannot unfollow yourself'}, 400
        
        # Check if the user is currently being followed
        if not current_user.is_following(user_to_unfollow):
            return {'errors': 'You are not following this user'}, 400

        current_user.unfollow(user_to_unfollow)
        db.session.commit()

        return jsonify({
            'message': 'Successfully unfollowed the user',
            'user': current_user.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return {'errors': 'Error occurred during the unfollow operation', 'message': str(e)}, 500
