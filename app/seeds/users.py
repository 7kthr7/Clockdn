from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
import random


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    demo = User(
        first_name = 'Demo',
        last_name = ' Lition ',
        email = 'demo_lition@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Student',
        biography = 'Student at App Academy',
        profile_image = 'https://www.yourlifeupdated.net/wp-content/uploads/2019/08/Anime-sub-ita-streaming.jpg',
        password = 'password',
        )
    
    Naruto = User(
        first_name = 'Naruto',
        last_name = 'Uzamaki',
        email = 'n_uzamaki@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'The Seventh Hokage',
        biography = 'I am the 7th Hokage of the Hidden Leaf Village',
        profile_image = 'https://artworks.thetvdb.com/banners/person/7903091/62083792.jpg',
        password = 'password',
        )
    Levi = User (
        first_name = 'Levi',
        last_name = 'Ackerman',
        email = 'l_ackerman@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Soldier',
        biography = 'I am a captain of the Special Operation Squad within the Survey Corp',
        profile_image = 'https://tinyurl.com/54uep5bn',
        password = 'password',
        )
    
    Light = User (
        first_name = 'Light',
        last_name = 'Yagami',
        email = 'l_yagami@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Detective',
        biography = 'I am a highly skilled an eccentric detective who studied forensic science and criminal psychology',
        profile_image = 'https://www.giantbomb.com/a/uploads/scale_medium/9/96986/1456248-1288248_blurb_light_yagami_20080627.jpg',
        password = 'password',
        )
    Satotu = User (
        first_name = 'Saturo',
        last_name = 'Gojo',
        email = 's_gojo@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Teacher',
        biography = 'I am a teacher and mentor atTokyo Jujutsu High',
        profile_image = 'https://tinyurl.com/mtj6w8mf',
        password = 'password',
)
    
    Tanjiro = User (
        first_name = 'Tanjiro',
        last_name = 'Kamado',
        email = 't_kamando@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Demon Slayer',
        biography = 'I was a former charcoal burner and became a self-taught Demon Slayer. I work with the Hashira group in the Demon Slayer Corps',
        profile_image = 'https://flxt.tmsimg.com/assets/p16787843_i_v10_ab.jpg',
        password = 'password',
    )

    Mikasa = User (
        first_name = 'Mikasa',
        last_name = 'Ackerman',
        email = 'm_ackerman@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Soldier',
        biography = 'I was a former top-ranked soldier for the 104th Training Corps. Currenly I am enlisted with the Survey Corps',
        profile_image = 'https://tinyurl.com/ms2dbcfj',
        password = 'password',
    )

    Sakura = User (
        first_name = 'Sakura',
        last_name = 'Haruno',
        email = 's_haruno@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Director, Medical Ninjustu Teacher ',
        biography = ' I was a former spy, but my passion for medicien led me to become the head of the Medical Department, the director of the Konoha Hospital and a medican ninjustu trainer.',
        profile_image = 'https://tinyurl.com/9sjc5u9r',
        password = 'password',
    )

    Sailor = User (
        first_name = 'Usagi',
        last_name = 'Tsukino',
        email = 'u_tsukino@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'student, sailor gauradian',
        biography = ' I am a student as well as the Sailor Guardian for love and justice',
        profile_image = 'https://tinyurl.com/2p8wsnee',
        password = 'password',
    )
    Claymore = User (
        first_name = 'Clare',
        last_name = 'Claymore',
        email = 'c_claymore@aa.io',
        city = 'San Francisco',
        state = 'CA',
        occupation = 'Swordswoman',
        biography = ' I am an expert swordswoman and have amazing attention to detail skills.',
        profile_image = 'https://c4.wallpaperflare.com/wallpaper/974/74/381/anime-claymore-clare-claymore-wallpaper-thumb.jpg',
        password = 'password',
    )



    db.session.add(demo)
    db.session.add(Naruto)
    db.session.add(Levi)
    db.session.add(Light)
    db.session.add(Satotu)
    db.session.add(Tanjiro)
    db.session.add(Mikasa)
    db.session.add(Sakura)
    db.session.add(Sailor)
    db.session.add(Claymore)

    db.session.commit()



    # def add_follow_relationships(user, users_to_follow):
    #     for user_to_follow in users_to_follow:
    #         user.follow(user_to_follow)
    def add_follow_relationships(user, users_to_follow):
        for user_to_follow in users_to_follow:
            user.follow(user_to_follow)

    all_users = [demo, Naruto, Levi, Light, Satotu, Tanjiro, Mikasa, Sakura, Sailor, Claymore]

    for user in all_users:
        other_users = [u for u in all_users if u != user]
        users_to_follow = random.sample(other_users, 2)
        add_follow_relationships(user, users_to_follow)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()