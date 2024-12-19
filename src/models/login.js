const pg = require('pg');
const config = {
    connectionString: 'postgresql://retool:EzNsdMKW60HJ@ep-wandering-waterfall-a6z20yl0.us-west-2.retooldb.com/retool?sslmode=require'
};

class Login {
    static async findAll(query = '') {
        const client = new pg.Client(config);
        await client.connect();

        const result = await client.query(
            "SELECT * FROM logins WHERE first_name ILIKE $1 OR last_name ILIKE $1 ORDER BY id ASC",
            ['%' + query + '%']
        );

        await client.end();
        return result.rows;
    }

    static async findById(id) {
        const client = new pg.Client(config);
        await client.connect();

        const result = await client.query(
            "SELECT * FROM logins WHERE id = $1",
            [id]
        );

        await client.end();
        return result.rows[0];
    }

    static async create(firstName, lastName, email) {
        const client = new pg.Client(config);
        await client.connect();

        const result = await client.query(
            "INSERT INTO logins (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
            [firstName, lastName, email]
        );

        await client.end();
        return result.rows[0];
    }

    static async update(id, firstName, lastName, email) {
        const client = new pg.Client(config);
        await client.connect();

        const result = await client.query(
            "UPDATE logins SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
            [firstName, lastName, email, id]
        );

        await client.end();
        return result.rows[0];
    }

    static async delete(id) {
        const client = new pg.Client(config);
        await client.connect();

        await client.query(
            "DELETE FROM logins WHERE id = $1",
            [id]
        );

        await client.end();
        return true;
    }
}

module.exports = Login;
