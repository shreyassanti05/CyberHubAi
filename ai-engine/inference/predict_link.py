from url_features import extract_features
from external_checks import check_ssl, domain_age, check_safe_browsing
from risk_engine import calculate_risk, get_verdict
from whitelist import extract_domain, is_trusted
import pickle
import os

# Make path absolute
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "../../models/phishing_model.pkl")
try:
    model = pickle.load(open(model_path, "rb"))
except Exception:
    model = None

def predict_url(url):
    domain = extract_domain(url)
    features = extract_features(url)
    
    # 1. Trusted Domain Whitelist Check
    if is_trusted(domain):
        return {
            "verdict": "Safe",
            "risk_score": 0,
            "ml_probability": 0.0,
            "features": features,
            "external_checks": {"trusted_domain": True}
        }
    
    # 2. Extract Features & External Checks
    external = {
        "ssl": check_ssl(domain),
        "domain_age": domain_age(domain),
        "google_flag": check_safe_browsing(url)
    }

    # 3. Baseline ML Prediction using probability
    ml_probability = 0.0
    if model:
        ml_features = [[
            features["length"],
            features["dots"],
            features["hyphens"],
            features["https"],
            features["ip"],
            features["suspicious"],
        ]]
        try:
            # Use predict_proba instead of predict
            probabilities = model.predict_proba(ml_features)[0]
            ml_probability = probabilities[1] # probability of phishing (class 1)
        except AttributeError:
            pred = model.predict(ml_features)[0]
            ml_probability = 1.0 if pred == 1 else 0.0

    # 4. Calculate Risk Engine Score
    score = calculate_risk(features, external)

    # 5. Hybrid Model adjustments
    # Only increase risk score if probabilty of phishing is high
    if ml_probability > 0.7:
        score += 20
        
    score = min(score, 100) # Ensure valid 0-100 range

    # 6. Final Decision Verdict
    verdict = get_verdict(score)
    
    # Optional override: If it's a known dangerous external source but score is not phishing, force to upper Suspicious or Phishing
    if external["google_flag"] and verdict == "Safe":
        verdict = "Suspicious"
        score = max(score, 50)

    # Return Debug Response shape
    return {
        "verdict": verdict,
        "risk_score": score,
        "ml_probability": round(ml_probability, 4),
        "features": features,
        "external_checks": external
    }