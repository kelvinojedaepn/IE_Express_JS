import request from 'supertest';
import app from '../API/app';
import scraper from '../API/scraper';

// Mocks the scraper module so you can control its behavior in the tests
jest.mock('../API/scraper');

// Test to ensure that the /api/entries route returns an array of entries
describe('GET /api/entries', () => {
    it('should return an array of entries', async () => {
        // Sets up the mock for the scraper to return a predefined value
        scraper.mockResolvedValue([
            {
                title: 'Test Title',
                link: 'https://example.com',
                points: 100,
                comments: 50,
            },
        ]);

        const response = await request(app).get('/api/entries');
        // Checks that the response status code is 200
        expect(response.statusCode).toBe(200);
        // Checks that the response body matches the predefined value
        expect(response.body).toEqual([
            {
                title: 'Test Title',
                link: 'https://example.com',
                points: 100,
                comments: 50,
            },
        ]);
    });

    // Test to ensure that the route returns a 500 error if the scraper fails
    it('should return a 500 error if scraper fails', async () => {
        // Sets up the mock for the scraper to throw an error
        scraper.mockRejectedValue(new Error('Scraper error'));

        const response = await request(app).get('/api/entries');
        // Checks that the response status code is 500
        expect(response.statusCode).toBe(500);
        // Checks that the response body matches the error message
        expect(response.body).toEqual({ message: 'Error fetching data' });
    });
});
