import requests
import trafilatura
from fastapi import HTTPException, status
import re

def extract_web_text(url) -> str:
    custom_headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) "
        )
    }

    # Check if the URL provided is a valid URL
    url_pattern = r"^https?://(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[/?#][^\s]*)?$"
    if not re.match(url_pattern, url):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Enter a valid URL"
        )

    try:
        res = requests.get(url, headers=custom_headers, timeout=10)
        res.raise_for_status()

        text = trafilatura.extract(res.text)

        if text is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail="Could not get text from the provided URL"
            )

        return text

    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="The website took too long to respond"
        )
    except requests.exceptions.ConnectionError:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not connect to the webpage at the provided URL"
        )
    except requests.exceptions.RequestException:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="An error occurred while getting text from the webpage"
        )


