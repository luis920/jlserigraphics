"""Add role in model user

Revision ID: 8b04fc3ad81e
Revises: 3c06e656a0b0
Create Date: 2025-03-25 15:56:44.172667

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b04fc3ad81e'
down_revision = '3c06e656a0b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rol', sa.String(length=20), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.drop_column('rol')

    # ### end Alembic commands ###
