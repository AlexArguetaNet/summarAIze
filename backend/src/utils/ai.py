from fastapi import HTTPException, status
from src.schemas.text_request import TextRequest
from groq import Groq
from groq import (APIConnectionError, RateLimitError, APIStatusError)
from src.utils.env_variables import get_api_key

# Get the API key
API_KEY = get_api_key()
client = Groq(api_key=API_KEY)

async def prompt_gpt(text: TextRequest) -> dict:
    textNoSpaces = text.text.strip()

    # Check if input is only whitespace
    isOnlySpaces = len(textNoSpaces) == 0
    if isOnlySpaces:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Input is empty. Please enter some text.")

    # Check if input is only numbers
    if textNoSpaces.isdigit():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Text is only numbers. Please enter words.")

    # Check if the text is reasonably long enough to summarize
    if len(text.text) < 250:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Text must be at least 250 characters long.")

    # Check if the input text has exceeded the maximum character count of 25,000
    if len(text.text) > 25000:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Maximum text length reached. Text should be less than 25000 characters.")

    try:

        prompt = "If the text is just a bunch of random characters or illegible, respond with three empty bullet points. Otherwise, summarize this text in three short single-sentence bullet points mark with asterisks. Here is the text: "

        chat_completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages = [
                {
                    "role": "user",
                    "content": f"{prompt}{text.text}",
                }
            ],
        )

        ai_response = chat_completion.choices[0].message.content
        legible_response = any(char.isalpha() for char in ai_response)

        if not legible_response:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Text may be illegible")

        # API call successful
        return {"summary": ai_response}

    # Handle Exceptions
    except HTTPException:
        # This is to raise the http exception that check if the response is legible
        raise
    except APIConnectionError as e:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="AI service cannot be reached")
    
    except RateLimitError as e:
        raise HTTPException(status_code=e.status_code, detail="Rate limit exceeded")
    
    except APIStatusError as e:
        raise HTTPException(status_code=e.status_code, detail="There was an error with AI services")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="There was an error with the server")
