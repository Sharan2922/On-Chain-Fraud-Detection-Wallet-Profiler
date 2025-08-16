from app.workers.celery_app import celery
from app.core.config import settings
from app.services.etl import fetch_account_summary
from app.services.features import engineer_features
from app.services.scoring import score_features, partial_fit
from app.db.session import SessionLocal
from app.models.wallet import Wallet

@celery.task(name="ingest_and_score", queue="etl")
def ingest_and_score(address: str):
    summary = fetch_account_summary(address)
    feats = engineer_features(summary)
    risk_score, level = score_features(feats, settings.MODEL_DIR)

    with SessionLocal() as db:
        w = db.get(Wallet, address.lower())
        if not w:
            w = Wallet(address=address.lower(), chain="base")
            db.add(w)
        w.tx_count = int(summary.get("tx_count", 0))
        w.unique_counterparties = int(summary.get("unique_counterparties", 0))
        w.total_in_value = float(summary.get("total_in_value", 0.0))
        w.total_out_value = float(summary.get("total_out_value", 0.0))
        w.approvals = int(summary.get("approvals", 0))
        w.dex_interactions = int(summary.get("dex_interactions", 0))
        w.scam_interactions = int(summary.get("scam_interactions", 0))
        w.risk_score = risk_score
        w.risk_level = level
        w.features = feats
        db.commit()

    # simple model refresh on single sample (batched in real system)
    partial_fit([feats], settings.MODEL_DIR)
    return {"address": address, "risk_score": risk_score, "risk_level": level}
