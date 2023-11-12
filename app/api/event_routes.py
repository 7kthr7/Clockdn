from flask import Blueprint, jsonify, session, request
from app.forms import EventForm  
from app.models import User, db, Event
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from datetime import datetime
from flask_login import login_required, current_user

event_routes = Blueprint('event', __name__)


@event_routes.route('/events')
# @login_required
def get_events():
    
#query the Event table for all Events
    all_events = Event.query.all()

#loop through the list of posts and return each post as a dictionary 
    event_detail = [event.to_dict() for event in all_events]
    print('IS THIS EVERYTHING  ----------->', event_detail)

    return event_detail




@event_routes.route('/<int:id>')
# @login_required
def get_event(id):

#query the Event table for event by id
    event = Event.query.get(id)
    singleEvent = event.to_dict()
    print('IS THIS EVERYTHING  ----------->', singleEvent)
    return singleEvent




@event_routes.route('/events', methods=['POST'])
@login_required
def create_event():
    form = EventForm()
    form.speakers.choices = [(user.id, user.name) for user in User.query.all()]

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event_image = request.files['event_image']
        event_image.filename = get_unique_filename(event_image.filename)
        upload = upload_file_to_s3(event_image)
        event = Event(
            event_image=upload,
            event_type=form.data['event_type'],
            event_name=form.data['event_name'],
            event_link=form.data['event_link'],
            event_address=form.data['event_address'],
            event_city=form.data['event_city'],
            event_state=form.data['event_state'],
            event_time_zone=form.data['event_time_zone'],
            event_start_date=form.data['event_start_date'],
            event_end_date=form.data['event_end_date'],
            event_start_time=form.data['event_start_time'],
            event_end_time=form.data['event_end_time'],
            event_description=form.data['event_description'],
            event_owner=form.data['event_owner'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        # Add selected speakers to the event
        selected_speaker_ids = form.speakers.data
        for speaker_id in selected_speaker_ids:
            speaker = User.query.get(speaker_id)
            if speaker:
                event.speakers.append(speaker)

        db.session.add(event)
        db.session.commit()
        return event.to_dict()

    return { 'validation_errors_to_error_messages' (form.errors)}

    

@event_routes.route('/events/<int:id>', methods=['PUT'])
@login_required
def edit_event(id):
    form = EventForm()
    form.speakers.choices = [(user.id, user.name) for user in User.query.all()]

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.get(id)
        if not event:
            return {'errors': 'Event not found'}, 404

        # Update event details
        event.event_type = form.data['event_type']
        event.event_name = form.data['event_name']
        event.event_link = form.data['event_link']
        event.event_address = form.data['event_address']
        event.event_city = form.data['event_city']
        event.event_state = form.data['event_state']
        event.event_time_zone = form.data['event_time_zone']
        event.event_start_date = form.data['event_start_date']
        event.event_end_date = form.data['event_end_date']
        event.event_start_time = form.data['event_start_time']
        event.event_end_time = form.data['event_end_time']
        event.event_description = form.data['event_description']
        event.event_owner = form.data['event_owner']
        event.updated_at = datetime.now()

        # Update speakers for the event
        selected_speaker_ids = set(form.speakers.data)
        current_speaker_ids = {speaker.id for speaker in event.speakers}

        # Add new speakers
        for speaker_id in selected_speaker_ids - current_speaker_ids:
            speaker = User.query.get(speaker_id)
            if speaker:
                event.speakers.append(speaker)

        # Remove unselected speakers
        for speaker_id in current_speaker_ids - selected_speaker_ids:
            speaker = User.query.get(speaker_id)
            if speaker:
                event.speakers.remove(speaker)

        db.session.commit()
        return event.to_dict()

    return { 'validation_errors_to_error_messages' (form.errors)}


@event_routes.route('/events/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return {'message': 'event deleted'}



