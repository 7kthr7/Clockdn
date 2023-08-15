from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from ..api.aws_helpers import ALLOWED_EXTENSIONS
# from app.models import Post

class PostForm(FlaskForm):
    title = StringField('title')
    body = TextAreaField('body', validators=[DataRequired(), Length(min=5, max=2000)])
    post_images = FileField('post_images', validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])

