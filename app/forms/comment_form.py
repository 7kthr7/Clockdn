from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import User


class CommentForm(FlaskForm):
    body = TextAreaField('comment', validators=[DataRequired()])
    submit = SubmitField('Submit')