"""empty message

Revision ID: ab0334f13f57
Revises: a2053b654e67
Create Date: 2025-06-18 08:57:34.429257

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ab0334f13f57'
down_revision = 'a2053b654e67'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('brews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('water_temp', sa.Numeric(scale=0), nullable=True))
        batch_op.add_column(sa.Column('celsius', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('notes', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('brews', schema=None) as batch_op:
        batch_op.drop_column('notes')
        batch_op.drop_column('celsius')
        batch_op.drop_column('water_temp')

    # ### end Alembic commands ###
