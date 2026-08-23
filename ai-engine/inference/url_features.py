import re
import math
from urllib.parse import urlparse

def url_entropy(url):
    """Calculate the Shannon entropy of the URL string."""
    prob = [float(url.count(c)) / len(url) for c in dict.fromkeys(list(url))]
    entropy = - sum([p * math.log2(p) for p in prob])
    return entropy

def extract_features(url):
    if not url.startswith(('http://', 'https://')):
        url_for_parse = 'http://' + url
    else:
        url_for_parse = url
        
    domain = urlparse(url_for_parse).netloc
    
    # Calculate subdomains (e.g. a.b.google.com -> 4 parts -> 2 subdomains)
    parts = domain.split('.')
    subdomains_count = len(parts) - 2 if len(parts) > 2 else 0
        
    return {
        "length": len(url),
        "dots": url.count('.'),
        "hyphens": url.count('-'),
        "https": 1 if "https" in url else 0,
        "ip": 1 if re.search(r'\d+\.\d+\.\d+\.\d+', domain) else 0,
        "suspicious": 1 if re.search(r'login|verify|secure|bank|account|update', url.lower()) else 0,
        "entropy": url_entropy(url),
        "subdomains": subdomains_count
    }