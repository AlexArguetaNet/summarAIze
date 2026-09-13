import requests
import trafilatura

def extract_web_text(url):
    custom_headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) "
        )
    }

    res = requests.get(url, headers=custom_headers)

    if res.status_code == 200:
        text = trafilatura.extract(res.text)
        return text
    else:
        return None
