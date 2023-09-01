from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text






# Adds a demo user, you can add other users here if you want
def seed_posts():

    demo1 = Post(
        user_id=1,
        title ='🚀 Exciting News! Introducing ClockDN 🕒',
        body="Hey everyone, I'm thrilled to introduce ClockDN, my very own take on a professional networking platform. 🌐 Inspired by the best, ClockDN is a platform similar to LinkedIn that aims to connect professionals across the globe. I'm incredibly proud of this project and can't wait to see it flourish. Join me on this journey as we build meaningful connections and empower each other's careers. 🤝💼 ",
        post_images = "https://imgur.com/a/wGCP6tB"
    )


    gojo1 = Post(
        user_id=5,
        title='When You Accidentally Unleash Too Much Cursed Energy',
        body="Hey folks, ever had those moments when you're just trying to control your cursed energy but end up causing chaos?  Yeah, that's been my Tuesday. Turns out, my 'subtle' display of power shattered a few windows. Whoops! Anyone else have any 'oops' moments they'd like to share? Let's laugh together over our supernatural mishaps!",
        post_images = 'https://tinyurl.com/u57tdv72'
    )

    naruto1 = Post(
        user_id=2,
        title='From Rasengan to Success',
        body="What's up, everyone? Just reminiscing about myninja journey and how it's taught me the power of never giving up! From mastering the Rasengan to becoming Hokage, every step has been a lesson in determination. Now, I'm channeling that same energy into. Let's connect and share tales of unwavering determination! Believe it!",
        post_images = 'https://tinyurl.com/2jeyy2nv'
    )

    sailor1 = Post(
        user_id=9,
        title='🌙✨ Embracing the Light of Transformation! 🌟🌸',
        body="Hello, fellow guardians of the cosmos! Just like the phases of the moon, life's journey has its ups and downs. As Sailor Moon, I've discovered that even in the darkest moments, our inner strength and the power of friendship can illuminate our path. Let's unite, share our stories of transformation, and stand together against any darkness that may come our way ",
        post_images = "https://tinyurl.com/y3v7dejc"
    )



    sakura1 = Post(
        user_id=8,
        title='Nurturing Health and Healing ',
        body="Hello everyone, My journey as a medical ninja has been a blossoming experience, much like the growth of a cherry blossom tree. From the early days of uncertainty to mastering the art of healing, I've dedicated myself to tending to wounds and nurturing recovery. Let's connect and share stories of perseverance and the beauty of restoring well-being, one patient at a time.", 
        post_images = 'https://tinyurl.com/kkm4ecnk'
    )




    clay1 = Post(
        user_id=10,
        title='Forged in Battle, United by Resolve! ',
        body="Greetings, fellow Claymores! Our lives are entwined with the clash of steel and the pursuit of justice. As warriors half-human, half-yoma, we've embraced our unique strength to protect humanity from darkness. Let's bond over our shared dedication, stories of sacrifice, and the unyielding spirit that drives us to stand firm in the face of adversity. Together, we forge a legacy of courage that will resonate through the ages.",
        post_images = "https://tinyurl.com/yeykubev"
    )  


    mikasa1 = Post(
        user_id=7,
        title='Honoring the Past, Embracing the Future!',
        body="Hey everyone, as a warrior, I've learned to treasure the memories of the past while forging ahead into the unknown. The lessons from Eren and our comrades inspire me to keep moving forward. With every step, I'm driven by the promise of a better world and the strength that comes from never giving up. Let's share our stories of resilience and keep the flame of hope alive!", 
        post_images = 'https://tinyurl.com/yvc73f3k'
    )
    
    light1 = Post(
        user_id=4,
        title='Exploring the Boundaries of Knowledge and Morality',
        body="Hello, In the pursuit of knowledge, we often find ourselves at crossroads of morality and ethics. As a dedicated student, I've always been fascinated by theintricate interplay between right and wrong. Whether it's deciphering complex equations or unraveling the mysteries of human behavior, I believe that understanding the world around us is the key to making it better. If you're as passionate about the endless quest for truth as I am, let's connect and discuss the philosophical journey",    
        post_images = 'https://tinyurl.com/3n97wpwu'
    )
    

    tanjiro1 = Post(
        user_id=6,
        title='Finding Strength in Bonds and Blossoms! ',
        body="Hello, friends! Just like a wisteria flower that blooms even amidst adversity, our bonds with fellow demon slayers give us the strength to persevere. The path ahead might be tough, but together, we're writing a story of hope and determination. Let's keep fighting, supporting, and cherishing every moment along the way.",
        post_images = 'https://wallpapers.com/images/hd/tanjiro-and-wisteria-flowers-jindnvyvl0yo5sad.jpg'
    )
    

    levi1 = Post(
        user_id=3,
        title='🚀✨ Leading Through Adversity ✨🌟',
        body="Hey everyone, I've spent my life facing the Titans, and one thing I've learned is that leadership means making tough choices in the heat of battle. As the captain of the Special Operations Squadwithin the Survey Corps, I've honed my skills in teamwork, strategy, and adaptability. Every challenge we face is an opportunity to grow stronger.If you're someone who thrives under pressure and values precision, let's connect.",
        post_images = 'https://tinyurl.com/yyjcdwu9'
    )



    
    
 

    






  

    db.session.add(demo1)
    db.session.add(gojo1)
    db.session.add(naruto1)
    db.session.add(sailor1)
    db.session.add(sakura1)
    db.session.add(clay1)
    db.session.add(mikasa1)
    db.session.add(light1)
    db.session.add(tanjiro1)
    db.session.add(levi1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()