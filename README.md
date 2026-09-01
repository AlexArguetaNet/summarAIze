# SummarAIze
![alt text](screenshots/home-page.png)

SummarAIze is an AI text summarization tool used to condense large bodies of text into three sentences.

## Features
- AI-Powered text summarization
- Copy the generated summary directly to your clipboard

## Tech Stack
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)](https://react.dev/)

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vite.dev/)

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)](https://www.docker.com/)

[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)](https://docs.docker.com/compose/)

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge\&logo=githubactions\&logoColor=white)](https://github.com/features/actions)

[![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge\&logo=pytest\&logoColor=white)](https://pytest.org/)

[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge\&logo=vitest\&logoColor=white)](https://vitest.dev/)

## Getting Started

1. Get a Groq API Key from the [Groq Console](https://console.groq.com)
2. Clone the repository
3. Navigate into the repository directory:

    ```
    cd summaraize
    ```

### Run using Docker (Recommended)
The quickest way to run SummarAIze is with Docker Compose

#### Prerequisites
- Docker
- Docker Compose
- A Groq API key



#### Installation
1. Copy the contents of ```backend/.env.example``` to a file called ```backend/.env```

    - Windows:

        ```
        Copy-Item backend/.env.example backend/.env
        ```

    - macOS/Linux:

        ```
        cp backend/.env.example backend/.env 
        ```

2. Open the ```.env``` file in any text editor and add your Groq API key to the variable ```GROQ_API_KEY```
   
    ```GROQ_API_KEY=yourAPIkey```

3. Use Docker Compose to start running SummarAIze:

    ```
    docker compose up -d --build
    ```

4. Go to the following URL in your web browser:

    [http://localhost:8080/](http://localhost:8080/)

<b>SummarAIze should now be displayed and ready to use.</b>

### Run on your Computer
You can also run SummarAIze directly on your machine if you'd like

#### Prerequisites

- Node.js
- Python 3.12
- A Groq API Key

#### Installation

<u>Setup the Backend</u>

1. Navigate to the backend directory

    ```
    cd backend
    ```

2. Create a ```.env``` file from the example provided

    - Windows:

        ```
        Copy-Item .env.example .env
        ```

    - macOS/Linux:

        ```
        cp .env.example .env
        ```

3. Open the ```.env``` file in any text editor and add your Groq API key to the variable ```GROQ_API_KEY```
   
    ```GROQ_API_KEY=yourAPIkey```

4. Create a Python virtual environment and activate it

    - Windows:

        ```
            python -m venv .venv
            .venv\Scripts\Activate.ps1    
        ```

    - macOS/Linux:

        ```
            python3 -m venv .venv
            source .venv/bin/activate    
        ```

5. Install the backend dependencies

    ```
    pip install -r requirements.txt
    ```

6. Start the FastAPI development server

    ```
    fastapi dev
    ```

The backend should now be running at:

    http://localhost:8000

<u>Setup the Frontend</u>

1. Open a new terminal and navigate to the web frontend directory:

    ```
    cd web-frontend
    ```

2. Create a ```.env``` file from the example provided

    - Windows:

        ```
        Copy-Item .env.example .env
        ```

    - macOS/Linux:

        ```
        cp .env.example .env
        ```

3. Install the frontend dependencies:

    ```
    npm install
    ```

4. Start the Vite development server:

    ```
    npm run dev
    ```
5. Open a web browser and go to the following URL:

    [http://localhost:5173](http://localhost:5173)

<b>SummarAIze should now be displayed and ready to use.</b>

## How it Works
SummarAIze uses a React frontend, a FastAPI backend, and the Groq API to generate summaries in the form of three bullet point sentences. When a user submits text, the frontend sends it to the backend in a POST request. The backend then processes the request and send the user's text to Groq. The text is summarized using the OpenAI's GPT OSS 120B model and returns the summary back to the frontend and displayed to the user. 

![alt text](screenshots/app-flow.jpeg)

## Project Structure
A decoupled application architecture is used, with the React frontend and FastAPI backend in their own dedicated folders. Both services contain their own Dockerfiles and set of automated tests. The project root has a Docker Compose file used to run the services together

```
.
├── web-frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   └── App.jsx
│   ├── tests/
│   │   ├── components/
│   │   ├── App.test.jsx
│   │   └── setup.js
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── main.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_routes.py
│   │   └── test_services.py
│   ├── .env.example
│   ├── requirements.txt
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── tests.yml
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Testing
The project uses [Pytest](https://docs.pytest.org/en/stable/) for backend testing and [Vitest](https://vitest.dev/) for frontend testing.

Tests are also automatically ran through GitHub Actions when pull requests are opened, and again when changes are pushed to the repository.

