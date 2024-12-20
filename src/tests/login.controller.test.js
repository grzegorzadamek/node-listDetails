const request = require('supertest');
const app = require('../app');

describe('Login Controller Tests', () => {
    test('GET /api/items should return array', async () => {
        const response = await request(app).get('/api/items');
        expect(Array.isArray(response.body)).toBe(true);
    });
});