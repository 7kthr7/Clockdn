from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


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
        profile_image = 'https://clock-dn.s3.us-east-2.amazonaws.com/splash%203.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMiJIMEYCIQCjSUqa3CqpEWF9hs96ZNn9k9yx%2F%2BWH7Sd9540kutN1%2FAIhAMlQuJOlwaPx8sQRx10pm7HHtI3I4%2F%2Bsra7X3Hgcsa8FKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTk4MjI0NDQ5Mjk1Igx2WJh963W2NUVFwvEqwQKkTGKMu5fmYWmjBZ4vuOlJnlnjQnVbbW55%2FuNMmZq1An3VcAH1oXzUOCZnFFg8BsLeJ20cZk8y%2BTzPOmfrXaNU3iubBPyAQVs6t07QpHeurTwgoLfM3RpDmuRR4KBekNT65Tbm4jyoMELKp8k%2FO4VbXaswit3BZRAqJ%2FjCwzH09r7F0TJQZOGhjYYaKU5dXCpiG27paYUrEU4mAiWkeV5z5%2FaBU8H%2BJBitv4FRM6WhsrwgRS7XcXOmtjIH6znmIfW0sT%2FmVd9KhDRufnrtQrFxGZUGIU9wMGV4xziy4uPFbrjB2Iwt6Fgb8MTVhuRLz%2B%2BhnPZeKouyfc80WYWqKyCXHwQSDEm0boRvwAWsDx6%2F1jeS1l0R2GE%2Fb8AdraPtfDXW4tQsPAKT0MXUW9b57ecL5wEeNPOt1sbHbzVszQ%2BcueIwktqKpwY6sgLekh%2BnE3X7dH1a5ftcLecQ7kAQeyxyNdK8BhYpbndAzm2blU3j7BYy4Tz5XEZnd6EKwj4hmYdGSi%2F1AhBTShXbCbDxtRRU6aY3yNUsFzhvodoDXy%2Fybck%2FnSgkiZkeuJ0Fp4Ag8JztgsQbW7TMM3WwuO2Kh9RBT%2F4DD0069zLEXF%2BZC9ThIXZpGjWpD2WujegEUUZWdYszVVhB63F8TWJOVm1Bdbs2vAX3xenk3UIS3018Co5TG7EhH5YmJE47nBjBx04xTdeUtFo9xsrXaGd6g7FevJ9An%2B9hlx0lM7wbSX8ey3d6kiZ6nLIW71uhJoeQDAcPr2qHbjErH44j%2BQaeT2ykZg9ebApKyJdHihAT8MlHJN2pvKKQakOIzAAni1j1lQTbXdYU6S2e8sLw0UyYXNM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230821T005431Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIAS4JYZB4H4MILBBHJ%2F20230821%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=cffe064459aeb524df0980c212b315121587e6981a6c30bfeda8e27b49fadbea',
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
        profile_image = 'https://clock-dn.s3.us-east-2.amazonaws.com/1224512.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMiJIMEYCIQCjSUqa3CqpEWF9hs96ZNn9k9yx%2F%2BWH7Sd9540kutN1%2FAIhAMlQuJOlwaPx8sQRx10pm7HHtI3I4%2F%2Bsra7X3Hgcsa8FKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTk4MjI0NDQ5Mjk1Igx2WJh963W2NUVFwvEqwQKkTGKMu5fmYWmjBZ4vuOlJnlnjQnVbbW55%2FuNMmZq1An3VcAH1oXzUOCZnFFg8BsLeJ20cZk8y%2BTzPOmfrXaNU3iubBPyAQVs6t07QpHeurTwgoLfM3RpDmuRR4KBekNT65Tbm4jyoMELKp8k%2FO4VbXaswit3BZRAqJ%2FjCwzH09r7F0TJQZOGhjYYaKU5dXCpiG27paYUrEU4mAiWkeV5z5%2FaBU8H%2BJBitv4FRM6WhsrwgRS7XcXOmtjIH6znmIfW0sT%2FmVd9KhDRufnrtQrFxGZUGIU9wMGV4xziy4uPFbrjB2Iwt6Fgb8MTVhuRLz%2B%2BhnPZeKouyfc80WYWqKyCXHwQSDEm0boRvwAWsDx6%2F1jeS1l0R2GE%2Fb8AdraPtfDXW4tQsPAKT0MXUW9b57ecL5wEeNPOt1sbHbzVszQ%2BcueIwktqKpwY6sgLekh%2BnE3X7dH1a5ftcLecQ7kAQeyxyNdK8BhYpbndAzm2blU3j7BYy4Tz5XEZnd6EKwj4hmYdGSi%2F1AhBTShXbCbDxtRRU6aY3yNUsFzhvodoDXy%2Fybck%2FnSgkiZkeuJ0Fp4Ag8JztgsQbW7TMM3WwuO2Kh9RBT%2F4DD0069zLEXF%2BZC9ThIXZpGjWpD2WujegEUUZWdYszVVhB63F8TWJOVm1Bdbs2vAX3xenk3UIS3018Co5TG7EhH5YmJE47nBjBx04xTdeUtFo9xsrXaGd6g7FevJ9An%2B9hlx0lM7wbSX8ey3d6kiZ6nLIW71uhJoeQDAcPr2qHbjErH44j%2BQaeT2ykZg9ebApKyJdHihAT8MlHJN2pvKKQakOIzAAni1j1lQTbXdYU6S2e8sLw0UyYXNM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230821T005614Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAS4JYZB4H4MILBBHJ%2F20230821%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=18dd8a7e0a274e4954abcb27c0e69a9e57e00084db49da3e99f1c7f2c8fe6366',
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
        profile_image = 'https://clock-dn.s3.us-east-2.amazonaws.com/artworks-B7CPzcyFD1VxolNj-Hkdexg-t500x500.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMiJIMEYCIQCjSUqa3CqpEWF9hs96ZNn9k9yx%2F%2BWH7Sd9540kutN1%2FAIhAMlQuJOlwaPx8sQRx10pm7HHtI3I4%2F%2Bsra7X3Hgcsa8FKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTk4MjI0NDQ5Mjk1Igx2WJh963W2NUVFwvEqwQKkTGKMu5fmYWmjBZ4vuOlJnlnjQnVbbW55%2FuNMmZq1An3VcAH1oXzUOCZnFFg8BsLeJ20cZk8y%2BTzPOmfrXaNU3iubBPyAQVs6t07QpHeurTwgoLfM3RpDmuRR4KBekNT65Tbm4jyoMELKp8k%2FO4VbXaswit3BZRAqJ%2FjCwzH09r7F0TJQZOGhjYYaKU5dXCpiG27paYUrEU4mAiWkeV5z5%2FaBU8H%2BJBitv4FRM6WhsrwgRS7XcXOmtjIH6znmIfW0sT%2FmVd9KhDRufnrtQrFxGZUGIU9wMGV4xziy4uPFbrjB2Iwt6Fgb8MTVhuRLz%2B%2BhnPZeKouyfc80WYWqKyCXHwQSDEm0boRvwAWsDx6%2F1jeS1l0R2GE%2Fb8AdraPtfDXW4tQsPAKT0MXUW9b57ecL5wEeNPOt1sbHbzVszQ%2BcueIwktqKpwY6sgLekh%2BnE3X7dH1a5ftcLecQ7kAQeyxyNdK8BhYpbndAzm2blU3j7BYy4Tz5XEZnd6EKwj4hmYdGSi%2F1AhBTShXbCbDxtRRU6aY3yNUsFzhvodoDXy%2Fybck%2FnSgkiZkeuJ0Fp4Ag8JztgsQbW7TMM3WwuO2Kh9RBT%2F4DD0069zLEXF%2BZC9ThIXZpGjWpD2WujegEUUZWdYszVVhB63F8TWJOVm1Bdbs2vAX3xenk3UIS3018Co5TG7EhH5YmJE47nBjBx04xTdeUtFo9xsrXaGd6g7FevJ9An%2B9hlx0lM7wbSX8ey3d6kiZ6nLIW71uhJoeQDAcPr2qHbjErH44j%2BQaeT2ykZg9ebApKyJdHihAT8MlHJN2pvKKQakOIzAAni1j1lQTbXdYU6S2e8sLw0UyYXNM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230821T005919Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAS4JYZB4H4MILBBHJ%2F20230821%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=6009e76a5cff54f285548f56896a0bd6657f60311d33626dd475b2c4980c0f0d',
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
        profile_image = 'https://clock-dn.s3.us-east-2.amazonaws.com/demon-slayer.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMiJIMEYCIQCjSUqa3CqpEWF9hs96ZNn9k9yx%2F%2BWH7Sd9540kutN1%2FAIhAMlQuJOlwaPx8sQRx10pm7HHtI3I4%2F%2Bsra7X3Hgcsa8FKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTk4MjI0NDQ5Mjk1Igx2WJh963W2NUVFwvEqwQKkTGKMu5fmYWmjBZ4vuOlJnlnjQnVbbW55%2FuNMmZq1An3VcAH1oXzUOCZnFFg8BsLeJ20cZk8y%2BTzPOmfrXaNU3iubBPyAQVs6t07QpHeurTwgoLfM3RpDmuRR4KBekNT65Tbm4jyoMELKp8k%2FO4VbXaswit3BZRAqJ%2FjCwzH09r7F0TJQZOGhjYYaKU5dXCpiG27paYUrEU4mAiWkeV5z5%2FaBU8H%2BJBitv4FRM6WhsrwgRS7XcXOmtjIH6znmIfW0sT%2FmVd9KhDRufnrtQrFxGZUGIU9wMGV4xziy4uPFbrjB2Iwt6Fgb8MTVhuRLz%2B%2BhnPZeKouyfc80WYWqKyCXHwQSDEm0boRvwAWsDx6%2F1jeS1l0R2GE%2Fb8AdraPtfDXW4tQsPAKT0MXUW9b57ecL5wEeNPOt1sbHbzVszQ%2BcueIwktqKpwY6sgLekh%2BnE3X7dH1a5ftcLecQ7kAQeyxyNdK8BhYpbndAzm2blU3j7BYy4Tz5XEZnd6EKwj4hmYdGSi%2F1AhBTShXbCbDxtRRU6aY3yNUsFzhvodoDXy%2Fybck%2FnSgkiZkeuJ0Fp4Ag8JztgsQbW7TMM3WwuO2Kh9RBT%2F4DD0069zLEXF%2BZC9ThIXZpGjWpD2WujegEUUZWdYszVVhB63F8TWJOVm1Bdbs2vAX3xenk3UIS3018Co5TG7EhH5YmJE47nBjBx04xTdeUtFo9xsrXaGd6g7FevJ9An%2B9hlx0lM7wbSX8ey3d6kiZ6nLIW71uhJoeQDAcPr2qHbjErH44j%2BQaeT2ykZg9ebApKyJdHihAT8MlHJN2pvKKQakOIzAAni1j1lQTbXdYU6S2e8sLw0UyYXNM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230821T010041Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAS4JYZB4H4MILBBHJ%2F20230821%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=89c2590a250d548e71b8d2b2f765b354f10d9de462c400ff51fd32e6bbc7a06f',
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
        profile_image = 'https://clock-dn.s3.us-east-2.amazonaws.com/claymore-clare-claymore.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMiJIMEYCIQCjSUqa3CqpEWF9hs96ZNn9k9yx%2F%2BWH7Sd9540kutN1%2FAIhAMlQuJOlwaPx8sQRx10pm7HHtI3I4%2F%2Bsra7X3Hgcsa8FKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTk4MjI0NDQ5Mjk1Igx2WJh963W2NUVFwvEqwQKkTGKMu5fmYWmjBZ4vuOlJnlnjQnVbbW55%2FuNMmZq1An3VcAH1oXzUOCZnFFg8BsLeJ20cZk8y%2BTzPOmfrXaNU3iubBPyAQVs6t07QpHeurTwgoLfM3RpDmuRR4KBekNT65Tbm4jyoMELKp8k%2FO4VbXaswit3BZRAqJ%2FjCwzH09r7F0TJQZOGhjYYaKU5dXCpiG27paYUrEU4mAiWkeV5z5%2FaBU8H%2BJBitv4FRM6WhsrwgRS7XcXOmtjIH6znmIfW0sT%2FmVd9KhDRufnrtQrFxGZUGIU9wMGV4xziy4uPFbrjB2Iwt6Fgb8MTVhuRLz%2B%2BhnPZeKouyfc80WYWqKyCXHwQSDEm0boRvwAWsDx6%2F1jeS1l0R2GE%2Fb8AdraPtfDXW4tQsPAKT0MXUW9b57ecL5wEeNPOt1sbHbzVszQ%2BcueIwktqKpwY6sgLekh%2BnE3X7dH1a5ftcLecQ7kAQeyxyNdK8BhYpbndAzm2blU3j7BYy4Tz5XEZnd6EKwj4hmYdGSi%2F1AhBTShXbCbDxtRRU6aY3yNUsFzhvodoDXy%2Fybck%2FnSgkiZkeuJ0Fp4Ag8JztgsQbW7TMM3WwuO2Kh9RBT%2F4DD0069zLEXF%2BZC9ThIXZpGjWpD2WujegEUUZWdYszVVhB63F8TWJOVm1Bdbs2vAX3xenk3UIS3018Co5TG7EhH5YmJE47nBjBx04xTdeUtFo9xsrXaGd6g7FevJ9An%2B9hlx0lM7wbSX8ey3d6kiZ6nLIW71uhJoeQDAcPr2qHbjErH44j%2BQaeT2ykZg9ebApKyJdHihAT8MlHJN2pvKKQakOIzAAni1j1lQTbXdYU6S2e8sLw0UyYXNM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230821T005545Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAS4JYZB4H4MILBBHJ%2F20230821%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=70839ef07cd39f4984b8dcbc8df16bf56625b4eecbf45358d2b77ac81bbb5b7c',
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



    def add_follow_relationships(user, users_to_follow):
        for user_to_follow in users_to_follow:
            user.follow(user_to_follow)

    all_users = [demo, Naruto, Levi, Light, Satotu, Tanjiro, Mikasa, Sakura, Sailor, Claymore]

    for user in all_users:
        other_users = [u for u in all_users if u != user]
        add_follow_relationships(user, other_users)

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