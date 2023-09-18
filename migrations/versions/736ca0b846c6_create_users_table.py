"""create users table

Revision ID: 736ca0b846c6
Revises: 
Create Date: 2023-09-18 17:44:27.400834

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '736ca0b846c6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=False),
    sa.Column('state', sa.String(length=2), nullable=False),
    sa.Column('occupation', sa.String(length=255), nullable=False),
    sa.Column('biography', sa.String(length=500), nullable=True),
    sa.Column('profile_image', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('connections',
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.Column('followed_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('follower_id', 'followed_id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=True),
    sa.Column('body', sa.String(length=2000), nullable=False),
    sa.Column('post_images', sa.String(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('events',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('event_image', sa.String(), nullable=False),
        sa.Column('event_type', sa.String(), nullable=False),
        sa.Column('event_name', sa.String(), nullable=False),
        sa.Column('event_link', sa.String(), nullable=False),
        sa.Column('event_address', sa.String(), nullable=True),
        sa.Column('event_city', sa.String(), nullable=True),
        sa.Column('event_state', sa.String(), nullable=True),
        sa.Column('event_time_zone', sa.String(), nullable=False),
        sa.Column('event_start_date', sa.DateTime(), nullable=False),
        sa.Column('event_end_date', sa.DateTime(), nullable=False),
        sa.Column('event_start_time', sa.DateTime(), nullable=False),
        sa.Column('event_end_time', sa.DateTime(), nullable=False),
        sa.Column('event_description', sa.String(), nullable=True),
        sa.Column('event_owner', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.Date(), server_default=sa.func.now()),
        sa.Column('updated_at', sa.Date(), server_default=sa.func.now(), onupdate=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE events SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('events')
    op.drop_table('likes')
    op.drop_table('comments')
    op.drop_table('posts')
    op.drop_table('connections')
    op.drop_table('users')
    # ### end Alembic commands ###
