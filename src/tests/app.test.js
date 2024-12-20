const request = require('supertest');
const app = require('../app');

describe('App Tests', () => {
    test('GET /api/items should return 200', async () => {
        const response = await request(app).get('/api/items');
        expect(response.statusCode).toBe(200);
    });

    test('404 on invalid route', async () => {
        const response = await request(app).get('/invalid-route');
        expect(response.statusCode).toBe(404);
    });
});
