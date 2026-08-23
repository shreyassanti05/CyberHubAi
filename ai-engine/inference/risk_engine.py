def calculate_risk(features, external):
    score = 0

    # ML features checks (less aggressive)
    if features.get("length", 0) > 75:
        score += 5
    if features.get("ip", 0):
        score += 35 # IP address in host is highly suspicious
    if features.get("suspicious", 0):
        score += 10
    if features.get("entropy", 0) > 4.5:
        score += 5
    if features.get("subdomains", 0) >= 3:
        score += 10

    # External checks
    if external.get("ssl") == 0:
        score += 15
    if external.get("domain_age", -1) != -1 and external.get("domain_age", 999) < 30:
        score += 10
    if external.get("google_flag"):
        score += 40 # Google safe browsing flag is very strong indicator

    return min(score, 100)

def get_verdict(score):
    if score < 30:
        return "Safe"
    elif score < 70:
        return "Suspicious"
    else:
        return "Phishing"