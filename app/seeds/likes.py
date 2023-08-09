from app.models import db, Like, environment, SCHEMA
from datetime import datetime

def seed_likes():

    likes = [
    Like(user_id=2, post_id=1),
    Like(user_id=3, post_id=1),
    Like(user_id=4, post_id=1),
    Like(user_id=5, post_id=1),
    Like(user_id=6, post_id=1),
    Like(user_id=7, post_id=1),
    Like(user_id=1, post_id=4),
    Like(user_id=1, post_id=3),
    Like(user_id=1, post_id=2),
    Like(user_id=1, post_id=7),
    Like(user_id=1, post_id=5),
    Like(user_id=3, post_id=8),
    Like(user_id=4, post_id=7),
    Like(user_id=5, post_id=6),
    Like(user_id=6, post_id=5),
    Like(user_id=7, post_id=4),
    Like(user_id=8, post_id=3),
    Like(user_id=9, post_id=2),
    Like(user_id=10, post_id=1),
    Like(user_id=3, post_id=7),
    Like(user_id=4, post_id=6),
    Like(user_id=5, post_id=5),
    Like(user_id=6, post_id=4),
    Like(user_id=7, post_id=3),
    Like(user_id=8, post_id=2),
    ]

  

    db.session.add_all(likes)
    db.session.commit()
    
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")
        
    db.session.commit()