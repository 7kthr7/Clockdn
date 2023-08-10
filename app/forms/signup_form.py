from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS
import re






def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def is_valid_email(form, field):
    email_input = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email = field.data
    if not re.match(email_input, email):
        raise ValidationError('Invalid email address.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired(), user_exists]
    )
    last_name = StringField(
        'last_name', validators=[DataRequired(), user_exists]
    )
    email = StringField('email', validators=[DataRequired(), is_valid_email, user_exists])
    city = StringField('city')
    state = StringField('state')
    occupation = StringField('occupation')
    biography = TextAreaField('biography')
    profile_image = FileField('profile image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    password = StringField('password', validators=[DataRequired()])
