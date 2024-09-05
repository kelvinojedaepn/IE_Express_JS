import request from 'supertest';
import app from '../API/app';
import scraper from '../API/scraper';

jest.mock('../API/scraper');

describe('GET /api/entries', () => {
    it('should return an array of entries', async () => {
        scraper.mockResolvedValue([
            {
                title: 'Test Title',
                link: 'https://example.com',
                points: 100,
                comments: 50,
            },
        ]);

        const response = await request(app).get('/api/entries');

        expect(response.statusCode).toBe(200);  // Asegúrate de que esperas 200 en lugar de 500 aquí
        expect(response.body).toEqual([
            {
                title: 'Test Title',
                link: 'https://example.com',
                points: 100,
                comments: 50,
            },
        ]);
    });

    it('should return a 500 error if scraper fails', async () => {
        scraper.mockRejectedValue(new Error('Scraper error'));

        const response = await request(app).get('/api/entries');

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ message: 'Error fetching data' });
    });
});
