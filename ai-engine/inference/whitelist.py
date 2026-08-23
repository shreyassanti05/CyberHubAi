from urllib.parse import urlparse

TRUSTED_DOMAINS = {
    "google.com",
    "youtube.com",
    "linkedin.com",
    "github.com",
    "microsoft.com",
    "amazon.com",
    "apple.com",
    "facebook.com",
    "twitter.com",
    "instagram.com",
    "netflix.com"
}

def extract_domain(url):
    """
    Extract clean domain from URL.
    Handles http://, https://, and missing schemes.
    """
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url
        
    try:
        parsed = urlparse(url)
        domain = parsed.netloc
        
        # Remove ports if present
        if ':' in domain:
            domain = domain.split(':')[0]
            
        # Strip www.
        if domain.startswith("www."):
            domain = domain[4:]
            
        return domain.lower()
    except Exception:
        return ""

def is_trusted(domain):
    """
    Check if domain is exactly in the whitelist
    or is a subdomain of a trusted domain.
    """
    if not domain:
        return False
        
    for trusted in TRUSTED_DOMAINS:
        if domain == trusted or domain.endswith("." + trusted):
            return True
    return False
