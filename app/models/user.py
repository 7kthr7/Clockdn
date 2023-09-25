from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .connections import connections
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    occupation = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String(500), nullable=True)
    profile_image = db.Column(db.String(), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    events = db.relationship('Event', back_populates='user')
    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')
    followers = db.relationship(
    'User', secondary=connections,
    primaryjoin=(connections.c.followed_id == id),
    secondaryjoin=(connections.c.follower_id == id),
    backref=db.backref('following', lazy='dynamic'), lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def follow(self, user):
        if not self.is_following(user):
            self.following.append(user)
        
    def unfollow(self, user):
        if self.is_following(user):
            self.following.remove(user)
            return self
        
    def is_following(self, user):
        return self.following.filter(connections.c.followed_id == user.id).count() > 0
    
    def is_follower(self, user):
        return self.followers.filter(connections.c.follower_id == user.id).count() > 0


    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'city': self.city,
            'state': self.state,
            'occupation': self.occupation,
            'biography': self.biography,
            'profile_image': self.profile_image,
            'created_at': self.created_at.strftime('%B %d, %Y %I:%M %p'),
            'updated_at': self.updated_at.strftime('%B %d, %Y %I:%M %p'),
            'followers': [follower.to_dict_connections() for follower in self.followers],
            'following': [following.to_dict_connections() for following in self.following]

        }
    
   

    def to_dict_connections(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'occupation': self.occupation,
            'profile_image': self.profile_image,
            
        }