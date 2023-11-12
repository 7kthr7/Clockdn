from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_events():
    demo = Event(
        event_image="https://images.unsplash.com/photo-1517245386807-9b0f8b76b8f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        event_type="Conference",
        event_name="Beautify Car Wash",
        event_link="https://www.eventbrite.com/e/beautify-car-wash-tickets-163456789123",
        event_address="1234 Main St",
        event_city="New York",
        event_state="NY",
        event_time_zone="(UTC-04:00) Eastern Time (US & Canada)",
        event_start_date=datetime(2021, 8, 1),
        event_end_date=datetime(2021, 8, 1),
        event_start_time=datetime(2021, 8, 1),
        event_end_time=datetime(2021, 8, 1),
        event_description="Come get your car washed and support a good cause!",
        event_owner=1,
        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    demo1 = Event(
        event_image="https://images.unsplash.com/photo-1517245386807-9b0f8b76b8f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        event_type="Conference",
        event_name="Beautify Car Wash",
        event_link="https://www.eventbrite.com/e/beautify-car-wash-tickets-163456789123",
        event_address="1234 Main St",
        event_city="New York",
        event_state="NY",
        event_time_zone="(UTC-04:00) Eastern Time (US & Canada)",
        event_start_date=datetime(2021, 8, 1),
        event_end_date=datetime(2021, 8, 1),
        event_start_time=datetime(2021, 8, 1),
        event_end_time=datetime(2021, 8, 1),
        event_description="Come get your car washed and support a good cause!",
        event_owner=1,
        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    demo2 = Event(
        event_image="https://images.unsplash.com/photo-1517245386807-9b0f8b76b8f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        event_type="Conference",
        event_name="Beautify Car Wash",
        event_link="https://www.eventbrite.com/e/beautify-car-wash-tickets-163456789123",
        event_address="1234 Main St",
        event_city="New York",
        event_state="NY",
        event_time_zone="(UTC-04:00) Eastern Time (US & Canada)",
        event_start_date=datetime(2021, 8, 1),
        event_end_date=datetime(2021, 8, 1),
        event_start_time=datetime(2021, 8, 1),
        event_end_time=datetime(2021, 8, 1),
        event_description="Come get your car washed and support a good cause!",
        event_owner=1,
        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    demo3 = Event(
        event_image="https://images.unsplash.com/photo-1517245386807-9b0f8b76b8f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        event_type="Conference",
        event_name="Beautify Car Wash",
        event_link="https://www.eventbrite.com/e/beautify-car-wash-tickets-163456789123",
        event_address="1234 Main St",
        event_city="New York",
        event_state="NY",
        event_time_zone="(UTC-04:00) Eastern Time (US & Canada)",
        event_start_date=datetime(2021, 8, 1),
        event_end_date=datetime(2021, 8, 1),
        event_start_time=datetime(2021, 8, 1),
        event_end_time=datetime(2021, 8, 1),
        event_description="Come get your car washed and support a good cause!",
        event_owner=1,
        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    demo4 = Event(
        event_image="https://images.unsplash.com/photo-1517245386807-9b0f8b76b8f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        event_type="Conference",
        event_name="Beautify Car Wash",
        event_link="https://www.eventbrite.com/e/beautify-car-wash-tickets-163456789123",
        event_address="1234 Main St",
        event_city="New York",
        event_state="NY",
        event_time_zone="(UTC-04:00) Eastern Time (US & Canada)",
        event_start_date=datetime(2021, 8, 1),
        event_end_date=datetime(2021, 8, 1),
        event_start_time=datetime(2021, 8, 1),
        event_end_time=datetime(2021, 8, 1),
        event_description="Come get your car washed and support a good cause!",
        event_owner=1,
        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    demo5 = Event(
        event_image="https://images.unsplash.com/photo-1517245386807-9b0f8b76b8f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        event_type="Conference",
        event_name="Beautify Car Wash",
        event_link="https://www.eventbrite.com/e/beautify-car-wash-tickets-163456789123",
        event_address="1234 Main St",
        event_city="New York",
        event_state="NY",
        event_time_zone="(UTC-04:00) Eastern Time (US & Canada)",
        event_start_date=datetime(2021, 8, 1),
        event_end_date=datetime(2021, 8, 1),
        event_start_time=datetime(2021, 8, 1),
        event_end_time=datetime(2021, 8, 1),
        event_description="Come get your car washed and support a good cause!",
        event_owner=1,
        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_events():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()