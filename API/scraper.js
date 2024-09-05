import puppeteer from "puppeteer";

const scraper = async () => {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    // Open a new page
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const entries = await page.evaluate(() => {
        // Select all the rows containing the news items
        const rows = document.querySelectorAll(".athing");
        let data = [];

        rows.forEach((row, index) => {
            if (index < 30) {
                // Get the title and link of the news item
                const titleElement = row.querySelector(".titleline a");
                // Get the subtext element that contains points and comments
                const subtextElement = row.nextElementSibling.querySelector(".subtext");
                // Get the points and comments elements
                const pointsElement = subtextElement.querySelector(".score");
                const commentsElement =
                    subtextElement.querySelectorAll("a")[
                    subtextElement.querySelectorAll("a").length - 1
                        ];

                // Extract text and link
                const title = titleElement ? titleElement.innerText : "";
                const link = titleElement ? titleElement.href : "";
                // Extract points and comments
                const points = pointsElement
                    ? parseInt(pointsElement.innerText.replace(" points", ""))
                    : 0;
                const comments =
                    commentsElement && commentsElement.innerText.includes("comment")
                        ? parseInt(commentsElement.innerText.replace(" comments", ""))
                        : 0;

                // Add the data to the results array
                data.push({
                    title,
                    link,
                    points,
                    comments,
                });
            }
        });

        return data;
    });

    // Close the browser instance
    await browser.close();
    // Return the scraped data
    return entries;
}

export default scraper;
