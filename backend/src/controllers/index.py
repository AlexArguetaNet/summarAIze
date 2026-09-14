from src.schemas.summary_request import SummaryRequest
from src.utils.ai import prompt_gpt
from src.utils.web_extractor import extract_web_text

async def get_text_summary(req: SummaryRequest) -> dict:
    res = await prompt_gpt(req.text)
    return res

async def get_url_summary(req: SummaryRequest) -> dict:
    text = extract_web_text(req.text)
    res = await prompt_gpt(text)   
    return res