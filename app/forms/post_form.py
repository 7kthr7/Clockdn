from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS
# from app.models import Post

class PostForm(FlaskForm):
    title = StringField('title')
    body = TextAreaField('body', validators=[DataRequired()])
    post_image = FileField('post images', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

