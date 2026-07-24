from fastapi import APIRouter, status
from src.controllers.test_controller import get_mock_summary
from src.schemas.text_request import TextRequest
from src.docs.routers import MOCK_SUMMARY_ENDPOINT_DESCRIPTION

router = APIRouter()

@router.post(
        "/test-summary",
        status_code=status.HTTP_200_OK,
        summary="Returns a mock summary for testing purposes",
        description=MOCK_SUMMARY_ENDPOINT_DESCRIPTION,
)
async def mock_summary(text: TextRequest) -> dict:
    return await get_mock_summary(text)
