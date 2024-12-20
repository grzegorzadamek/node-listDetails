const pool = require('../config/database');

describe('Database Connection Tests', () => {
    test('should connect to database', async () => {
        const client = await pool.connect();
        expect(client).toBeDefined();
        client.release();
    });

    test('should execute query', async () => {
        const result = await pool.query('SELECT NOW()');
        expect(result.rows).toBeDefined();
    });
});