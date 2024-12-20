const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://retool:EzNsdMKW60HJ@ep-wandering-waterfall-a6z20yl0.us-west-2.retooldb.com/retool?sslmode=require',
    max: 20,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 10000,
    retryDelay: 3000,
    maxRetries: 3
});

// Add event listeners for connection issues
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = pool;module.exports = pool;
