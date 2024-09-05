const express = require("express")
const app = express()
// Importing CORS to allow requests from other domains
const cors = require("cors")
const PORT = process.env.PORT || 5000

// Using CORS to allow requests from any origin
app.use(cors())

// Defining a GET route for the /api/entries endpoint. When a user visits this route, I send the response "Path /api/entries"
app.get("/api/entries", async (req, res) => {
    res.send("Path /api/entries")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
