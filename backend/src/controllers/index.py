from src.schemas.text_request import TextRequest
from src.utils.ai import prompt_gpt

async def get_text_summary(text: TextRequest) -> dict:
    """
        Summarizes text into three bullet points using GPT OSS 20B via the Groq API.

        Validates the character count of text is at least 250. A chat completion request
        is sent to OpenAI's GPT OSS 120B model hosted on Groq Cloud and the chat response
        is returned. Exceptions from the Groq package are caught and translated into
        FastAPI HTTPExceptions.

        Args:
            text (TextRequest): Pydantic request body containing the user's text input

        Returns:
            dict: The summary result

        Raises:
            HTTPException: 400 Bad Request - if the text is under 250 characters.
            HTTPException: 429 Too Many Requests - reached Groq API rate limit
            HTTPException: 503 Service Unavailable - cannot connect to Groq services
            HTTPException: 500 Internal Server Error - unexpected backend failures

    """
    res = await prompt_gpt(text)
    return res