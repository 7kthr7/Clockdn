from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from app.models import User


class CommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
    # submit = SubmitField('Submit')