from .db import db, add_prefix_for_prod, environment, SCHEMA
from datetime import datetime

connections = db.Table('connections',
    db.Model.metadata,
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("created_at", db.DateTime, default=datetime.now)
)

if environment == "production":
    connections.schema = SCHEMA