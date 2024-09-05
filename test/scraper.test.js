import puppeteer from 'puppeteer';
import scraper from '../API/scraper';

// Mock the puppeteer module
jest.mock('puppeteer', () => {
    return {
        launch: jest.fn()
    };
});

describe('Integration Test for scraper', () => {
    it('should return data with a specific format', async () => {
        const mockPage = {
            goto: jest.fn(),
            evaluate: jest.fn().mockResolvedValue([
                {
                    title: 'Test Title',
                    link: 'https://example.com',
                    points: 100,
                    comments: 50,
                },
            ]),
            close: jest.fn(),
        };

        const mockBrowser = {
            newPage: jest.fn().mockResolvedValue(mockPage),
            close: jest.fn(),
        };

        // Set up the mock to return the mockBrowser
        puppeteer.launch.mockResolvedValue(mockBrowser);

        try {
            const result = await scraper();

            // Check that the result is an array and has elements
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);

            // Validate that each item in the array has the expected structure and types
            result.forEach(item => {
                expect(item).toHaveProperty('title');
                expect(item).toHaveProperty('link');
                expect(item).toHaveProperty('points');
                expect(item).toHaveProperty('comments');

                expect(typeof item.title).toBe('string');
                expect(typeof item.link).toBe('string');
                expect(typeof item.points).toBe('number');
                expect(typeof item.comments).toBe('number');
            });
        } catch (error) {
            console.error("Test failed with error:", error);
            throw error;
        }
    });
});
