from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, DateTimeField, SelectMultipleField, IntegerField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, Length, Optional

# Assuming ALLOWED_EXTENSIONS includes allowed image types for event_image
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class EventForm(FlaskForm):
    event_image = FileField('Event Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), 'Invalid file type!')])
    event_type = StringField('Event Type', validators=[DataRequired()])
    event_name = StringField('Event Name', validators=[DataRequired()])
    event_link = StringField('Event Link', validators=[DataRequired()])
    event_address = StringField('Event Address', validators=[Optional()])
    event_city = StringField('Event City', validators=[Optional()])
    event_state = StringField('Event State', validators=[Optional()])
    event_time_zone = StringField('Event Time Zone', validators=[DataRequired()])
    event_start_date = DateTimeField('Event Start Date', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
    event_end_date = DateTimeField('Event End Date', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
    event_start_time = DateTimeField('Event Start Time', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
    event_end_time = DateTimeField('Event End Time', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
    event_description = TextAreaField('Event Description', validators=[Optional(), Length(max=2000)])
    event_owner = IntegerField('Event Owner ID', validators=[DataRequired()])  # This can be a dropdown if needed
    speakers = SelectMultipleField('Event Speakers', coerce=int)  # Here, you might populate choices dynamically
    
    submit = SubmitField('Submit')
