from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text




def seed_comments():

    comment1 = Comment (
        body="Congratulations!!!!!!!!!!! woop woop",
        post_id=1,
        user_id=8,
       
    )
    comment2 = Comment (
        body="Keep up the good work!",
        post_id=1,
        user_id=3,
       
    )
    comment3 = Comment (
        body="So inspiring congratulations on your journey you deserve it!",
        post_id=5,
        user_id=2,
       
    )
    comment4 = Comment (
        body="haha ya like that one time i couldn't keep the nine tail in check",
        post_id=2,
        user_id=2,
       
    )
    comment5 = Comment (
        body='miss you guys',
        post_id=7,
        user_id=3,
       
    )
    comment6 = Comment (
        body="yes, let's definetly connect! I started reading Beyond Good and Evil by Nietzsche",
        post_id=8,
        user_id=3,
       
    )
    comment7 = Comment (
        body="Wow this is such a throwback, we were so young and have come so far",
        post_id=3,
        user_id=8,
       
    )
    comment8 = Comment (
        body="You have always been such an insipiration! let's connect",
        post_id=4,
        user_id=8,
       
    )
    comment9 = Comment (
       body = "Such a wonderful post! Clare, let's definetly connect and share stories!",
        post_id=6,
        user_id=7,
       
    )
    comment10 = Comment (
        body="The wisteria flower is one of favorites. Love this post.",
        post_id=9,
        user_id=9,
       
    )
    comment11 = Comment (
        body="As someone who is constantly working under pressure I really appreciate your post let's connect",
        post_id=10,
        user_id=10,
       
    )
    comment12 = Comment (
        body = "Yes, I am huge supporter of accepting the future and learning from the past.",
        post_id=7,
        user_id=5,
       
    )
    comment13 = Comment (
        body="Thank you so much guys!!! appreciate it",
        post_id=1,
        user_id=1,
       
    )
    comment14 = Comment (
        body="Really appreciate this post Clare!!! Congratulations on all your success",
        post_id=6,
        user_id=6,
       
    )
    comment15 = Comment (
        body="This is so cool!",
        post_id=1,
        user_id=6,
       
    )


    

    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15]
    add_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()