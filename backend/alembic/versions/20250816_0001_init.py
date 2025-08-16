from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20250816_0001_init'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'wallets',
        sa.Column('address', sa.String(64), primary_key=True),
        sa.Column('risk_score', sa.Float, nullable=True),
        sa.Column('risk_level', sa.String(16), nullable=True),
        sa.Column('features', sa.JSON, nullable=True),
        sa.Column('last_updated', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_table(
        'labels',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('address', sa.String(64), nullable=False, index=True),
        sa.Column('label', sa.String(64), nullable=False),
        sa.Column('source', sa.String(64), nullable=True),
        sa.Column('note', sa.Text, nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

def downgrade():
    op.drop_table('labels')
    op.drop_table('wallets')
