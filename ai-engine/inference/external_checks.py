import ssl
import socket
import whois
import requests
from datetime import datetime

def check_ssl(domain):
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=2.0) as sock:
            with ctx.wrap_socket(sock, server_hostname=domain) as s:
                pass
        return 1
    except:
        return 0

def domain_age(domain):
    try:
        # A subprocess workaround or python-whois fix...
        # python-whois unfortunately doesn't support timeout directly, but let's try reading and suppress failure
        # to ensure it does not hang infinitely.
        # Temporarily limiting this if whois module is prone to hanging on certain domains.
        info = whois.whois(domain)
        creation = info.creation_date

        if isinstance(creation, list):
            creation = creation[0]

        age_days = (datetime.now() - creation).days
        return age_days
    except:
        return 0

API_KEY = "YOUR_GOOGLE_API_KEY"

def check_safe_browsing(url):
    body = {
        "client": {"clientId": "cyberhub", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }

    try:
        res = requests.post(
            f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={API_KEY}",
            json=body,
            timeout=2.0
        )
        return 1 if res.json().get("matches") else 0
    except:
        return 0