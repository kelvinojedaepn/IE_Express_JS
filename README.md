# IE_Express_JS

# Hacker News Scraper API

## Project Overview

The goal of this project is to create an API that performs web crawling on [Hacker News](https://news.ycombinator.com), retrieving the title, link, points, and comments from the latest posts. For this, we use **Puppeteer** for scraping, and **Supertest** for testing.

## Installation

To initialize the project, follow these steps:

1. Clone this repository.

2. Install the required dependencies by running:

    ```bash
    npm install
    ```

3. Once the dependencies are installed, start the API by executing:

    ```bash
    node ./API/index.js
    ```

   Alternatively, to simplify the process, you can run:

    ```bash
    npm run dev
    ```

   This command installs the dependencies (if not already installed) and starts the server automatically, ensuring a smooth setup.

## Testing

To run the automated tests, use the following command:

```bash
npm test
```

**Jest** is used as the testing framework, while Supertest is employed for API endpoint testing.

## Key Libraries
* **Puppeteer**: Used for web scraping on Hacker News.
* **Supertest**: For testing API endpoints.
* **Jest**: The testing framework for running unit and integration tests.