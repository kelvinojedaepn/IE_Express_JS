const request = require('supertest');
const express = require('express');
const app = express();

app.get('/api/entries', (req, res) => {
    res.send("Path /api/entries");
});

describe('GET /api/entries', () => {
    it('should return "Path /api/entries"', async () => {
        const response = await request(app).get('/api/entries');
        expect(response.statusCode).toBe(200); // Ensure the response status is 200 (OK)
        expect(response.text).toBe("Path /api/entries"); // Ensure the response text is as expected
    });
});
