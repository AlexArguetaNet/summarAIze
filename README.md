# Summarai

Summarai is an AI text summarization tool used to condense large bodies of text into three sentences.

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

### Prerequisites
- Docker
- Docker Compose

### Installation
1. Get a Groq API Key from the [Groq Console](https://console.groq.com)
2. Clone the repository
3. Move into the repository directory

    ```cd summarai ```
4. Copy the contents of ```.env.example``` to a file called ```.env```

    - Windows

        ```Copy-Item backend/.env.example backend/.env```

    - Linux

        ```cp backend/.env.example backend/.env ```

5. Open the ```.env``` file in a text editor

    - Windows

        ```Notepad backend/.env```
    
    - Linux

        ```nano backend/.env```

6. Paste your Groq API key into the ```GROQ_API_KEY``` field, then save the ```.env``` file

    - Example
        ```GROQ_API_KEY=123your456groq789api101112key```

### Running the Application

1. Use Docker Compose to start running Summarai

    ```docker compose up -d --build```

2. Open a web browser and go to the following URL

    [http://localhost:8080/](http://localhost:8080/)

You should now see the Summarai Web App

