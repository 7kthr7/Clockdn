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

    
    
    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')
    
    followed = db.relationship(
        'User', secondary=connections,
        primaryjoin=(connections.c.follower_id == id),
        secondaryjoin=(connections.c.followed_id == id),
        backref=db.backref('connections', lazy='dynamic'), lazy='dynamic'
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
            self.followed.append(user)
            return self
        
    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            return self
        
    def is_following(self, user):
            return self.followed.filter(connections.c.followed_id == user.id).count() > 0

    def to_dict_connections(self):
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
            'updated_at': self.updated_at.strftime('%B %d, %Y %I:%M %p')
        }
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.last_name,
            'city': self.city,
            'state': self.state,
            'occupation': self.occupation,
            'biography': self.biography,
            'profile_image': self.profile_image,
            'followers': [follower.to_dict_followers() for follower in self.followers],
            'following': [following.to_dict_followers() for following in self.followed]
        }
