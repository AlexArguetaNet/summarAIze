
# Descriptions for summary router

SUMMARIZE_ENDPOINT_DESCRIPTION= """
Processes a block of text and generates a three-bullet-point summary using Meta **GPT OSS 20B**.

### Key Requirements & Constraints:
* **Minimum Length:** Input text must contain at least **250 characters**.
* **Input Payload:** JSON object containing a `text` string field.

### Expected Output:
* Returns a JSON object with a `summary` key containing three bullet points marked by asterisks.
"""

# Descriptions for test router

MOCK_SUMMARY_ENDPOINT_DESCRIPTION= """
Returns a mock summarization of a paragraph into three bullet points for testing purposes.

### Expected Output:
* Returns a JSON object with a `summary` key containing three bullet points marked by asterisks.
"""

