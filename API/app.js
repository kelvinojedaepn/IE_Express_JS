import express from 'express'
const app = express()
// Importing CORS to allow requests from other domains
import cors from 'cors'
import scraper from './scraper.js'

// Using CORS to allow requests from any origin
app.use(cors())

// Defining a GET route for the /api/entries endpoint. When a user visits this route, the server fetches data from Hacker News and returns it in JSON format
app.get("/api/entries", async (req, res) => {
    try {
        const entries = await scraper()
        res.json(entries)
    } catch (error) {
        res.status(500).json({message: "Error fetching data"})
    }
})


export default app