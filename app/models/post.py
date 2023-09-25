from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    body = db.Column(db.String(2000), nullable=False) 
    post_images = db.Column(db.String, nullable=True)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    

    user = db.relationship('User', back_populates='posts', )
    comments = db.relationship('Comment', back_populates='posts', cascade="all, delete-orphan")
    likes = db.relationship('Like', back_populates='posts', cascade="all, delete-orphan")

    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name':self.user.first_name,
            'last_name':self.user.last_name,
            'profile_image':self.user.profile_image,
            'occupation': self.user.occupation,
            'title': self.title,
            'body': self.body,
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes], 
            'post_images': self.post_images,
            # 'user': self.user.to_dict(),
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        