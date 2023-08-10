from .db import db, add_prefix_for_prod, environment, SCHEMA
from datetime import datetime

connections = db.Table('connections',
    db.Model.metadata,
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("created_at", db.DateTime, default=datetime.now)
)
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

    #     if environment == "production":
    # connections.schema = SCHEMA