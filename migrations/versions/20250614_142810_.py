"""empty message

Revision ID: a2053b654e67
Revises: 044961f0a1b4
Create Date: 2025-06-14 14:28:10.630725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2053b654e67'
down_revision = '044961f0a1b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('brews', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               type_=sa.String(length=12),
               existing_nullable=True,
               existing_server_default=sa.text('(CURRENT_DATE)'))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('brews', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.String(length=12),
               type_=sa.DATE(),
               existing_nullable=True,
               existing_server_default=sa.text('(CURRENT_DATE)'))

    # ### end Alembic commands ###
