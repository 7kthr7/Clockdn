from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


event_speakers = db.Table(
    'event_speakers',
    db.Column('event_id', db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    event_image = db.Column(db.String, nullable=False)
    event_type = db.Column(db.String, nullable=False)
    event_name = db.Column(db.String, nullable=False)
    event_link = db.Column(db.String, nullable=False)
    event_address = db.Column(db.String, nullable=True)
    event_city = db.Column(db.String, nullable=True)
    event_state = db.Column(db.String, nullable=True)
    event_time_zone = db.Column(db.String, nullable=False)
    event_start_date = db.Column(db.DateTime, nullable=False)
    event_end_date = db.Column(db.DateTime, nullable=False)
    event_start_time = db.Column(db.DateTime, nullable=False)
    event_end_time = db.Column(db.DateTime, nullable=False)
    event_description = db.Column(db.String, nullable=True)
    event_owner = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    speakers = db.relationship('User', secondary=event_speakers, backref='events_as_speaker')
    user = db.relationship('User', back_populates='events')


