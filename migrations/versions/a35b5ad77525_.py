"""empty message

Revision ID: a35b5ad77525
Revises: 736ca0b846c6
Create Date: 2023-09-18 18:46:26.894004

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a35b5ad77525'
down_revision = '736ca0b846c6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
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
    sa.Column('event_description', sa.Text(), nullable=True),
    sa.Column('event_owner', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['event_owner'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event_speakers',
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('event_id', 'user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('event_speakers')
    op.drop_table('events')
    # ### end Alembic commands ###