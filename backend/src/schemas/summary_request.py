from pydantic import BaseModel

class SummaryRequest(BaseModel):
    """Request body for the summarization endpoint"""
    text: str
    isUrl: bool