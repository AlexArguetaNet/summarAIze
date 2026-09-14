from fastapi import APIRouter, status
from src.controllers.index import get_text_summary
from src.schemas.text_request import TextRequest
from src.docs.routers import SUMMARIZE_ENDPOINT_DESCRIPTION

router = APIRouter()

@router.post(
        "/summarize",
        status_code=status.HTTP_200_OK, 
        summary="Summarize long text",
        description=SUMMARIZE_ENDPOINT_DESCRIPTION,
        responses={
            400: {"description": "Text is shorter than 250 characters"},
            429: {"description": "Groq Rate limit exceeded"},
            500: {"description": "Unexpected backend error"},
            503: {"description": "Groq summarization Service Unavailable"}
        } 
)
async def summarize(text: TextRequest) -> dict:
    return await get_text_summary(text)