from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now()) 
    
    ##! Relationships
    user = db.relationship('User', back_populates='comments')
    posts = db.relationship('Post', back_populates='comments')
    
    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'first_name':self.user.first_name,
            'last_name':self.user.last_name,
            'profile_image':self.user.profile_image,
            'occupation': self.user.occupation,
            # 'user': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
    }

 