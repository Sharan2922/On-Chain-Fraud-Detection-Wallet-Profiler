import os, pickle
from typing import Dict, Any, Tuple
import numpy as np
from sklearn.ensemble import IsolationForest

MODEL_NAME = "iforest.pkl"

def _model_path(model_dir: str) -> str:
    os.makedirs(model_dir, exist_ok=True)
    return os.path.join(model_dir, MODEL_NAME)

def load_or_init_model(model_dir: str) -> IsolationForest:
    path = _model_path(model_dir)
    if os.path.exists(path):
        with open(path, "rb") as f:
            return pickle.load(f)
    # init a fresh model
    return IsolationForest(n_estimators=200, contamination="auto", random_state=42)

def save_model(model: IsolationForest, model_dir: str) -> None:
    path = _model_path(model_dir)
    with open(path, "wb") as f:
        pickle.dump(model, f)

FEATURE_ORDER = [
    "log_tx_count",
    "log_unique_counterparties",
    "log_total_in",
    "log_total_out",
    "approvals_ratio",
    "dex_ratio",
    "scam_ratio",
]

def features_to_vector(features: Dict[str, float]) -> np.ndarray:
    return np.array([[features.get(k, 0.0) for k in FEATURE_ORDER]], dtype=float)

def score_features(features: Dict[str, float], model_dir: str) -> Tuple[float, str]:
    model = load_or_init_model(model_dir)
    X = features_to_vector(features)
    # decision_function higher is more normal; convert to anomaly score in [0,1]
    decision = model.decision_function(X)[0]
    # normalize to 0..1 via logistic-like transform
    anomaly_score = 1.0 / (1.0 + np.exp(5 * decision))
    # derive risk score (higher is riskier) and risk level
    risk_score = float(np.clip(anomaly_score * 100.0 + features.get("scam_ratio", 0.0)*50.0, 0, 100))
    if risk_score >= 80:
        level = "high"
    elif risk_score >= 50:
        level = "medium"
    elif risk_score >= 20:
        level = "low"
    else:
        level = "very_low"
    return risk_score, level

def partial_fit(features_batch, model_dir: str):
    model = load_or_init_model(model_dir)
    X = np.vstack([features_to_vector(f) for f in features_batch])
    # IsolationForest has no true partial_fit; simple refit on rolling window
    model = IsolationForest(n_estimators=200, contamination="auto", random_state=42).fit(X)
    save_model(model, model_dir)
