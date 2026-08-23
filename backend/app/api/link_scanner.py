from fastapi import APIRouter
from app.db.database import db
from datetime import datetime
import sys
import os

# Get absolute path to ai-engine/inference
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "../../../"))
inference_path = os.path.join(project_root, "ai-engine", "inference")
sys.path.append(inference_path)

from predict_link import predict_url

router = APIRouter()

@router.post("/scan-link")
async def scan_link(data: dict):
    url = data.get("url")

    # Call AI Model Prediction
    result = predict_url(url)

    record = {
        "url": url,
        "result": result.get("verdict", "Unknown"),
        "risk_score": result.get("risk_score", 0),
        "timestamp": datetime.utcnow()
    }

    await db["scans"].insert_one(record)

    return result