from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_init'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'wallets',
        sa.Column('address', sa.String(length=42), primary_key=True),
        sa.Column('chain', sa.String(length=32)),
        sa.Column('tx_count', sa.Integer()),
        sa.Column('unique_counterparties', sa.Integer()),
        sa.Column('total_in_value', sa.Float()),
        sa.Column('total_out_value', sa.Float()),
        sa.Column('approvals', sa.Integer()),
        sa.Column('dex_interactions', sa.Integer()),
        sa.Column('scam_interactions', sa.Integer()),
        sa.Column('anomaly_score', sa.Float()),
        sa.Column('risk_score', sa.Float()),
        sa.Column('risk_level', sa.String(length=16)),
        sa.Column('features', sa.JSON()),
        sa.Column('created_at', sa.DateTime(timezone=True)),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
    )
    op.create_table(
        'labels',
        sa.Column('address', sa.String(length=42), primary_key=True),
        sa.Column('label', sa.String(length=64), nullable=False),
        sa.Column('source', sa.String(length=64)),
        sa.Column('note', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True)),
    )
    op.create_table(
        'risk_events',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('subject', sa.String(length=42), index=True),
        sa.Column('event_type', sa.String(length=64)),
        sa.Column('severity', sa.String(length=16)),
        sa.Column('details', sa.JSON()),
        sa.Column('created_at', sa.DateTime(timezone=True)),
    )

def downgrade() -> None:
    op.drop_table('risk_events')
    op.drop_table('labels')
    op.drop_table('wallets')
