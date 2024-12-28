const pool = require('../config/database.js');

class LoginController {
    static async getAllItems(req, res) {
        try {
            const query = '%' + (req.query.query || '') + '%';
            const result = await pool.query(
                "SELECT * FROM logins WHERE first_name ILIKE $1 OR last_name ILIKE $1 ORDER BY id ASC",
                [query]
            );

            const response = result.rows.map(({
                first_name: firstName,
                last_name: lastName,
                ...rest
            }) => ({
                firstName,
                lastName,
                ...rest
            }));

            return res.json(response);
        } catch (error) {
            console.error('Error in getAllItems:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async getItem(req, res) {
        try {
            const { itemId } = req.params;
            const { rows } = await pool.query(
                "SELECT * FROM logins WHERE id = $1",
                [itemId]
            );

            if (!rows.length) {
                return res.status(404).json({ error: 'Item not found' });
            }

            const {first_name: firstName, last_name: lastName, ...rest} = rows[0];
            res.json({ firstName, lastName, ...rest });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching item' });
        }
    }

    static async addItem(req, res) {
        const { firstName, lastName, email } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            await pool.query(
                "INSERT INTO logins (first_name, last_name, email) VALUES ($1, $2, $3)",
                [firstName, lastName, email]
            );
            res.status(201).json({ message: "Item added successfully" });
        } catch (error) {
            res.status(500).json({ error: 'Error adding item' });
        }
    }

    static async updateItem(req, res) {
        const { id, firstName, lastName, email } = req.body;

        if (!id || !firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const { rowCount } = await pool.query(
                "UPDATE logins SET first_name = $1, last_name = $2, email = $3 WHERE id = $4",
                [firstName, lastName, email, id]
            );

            if (!rowCount) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json({ message: "Item updated successfully" });
        } catch (error) {
            res.status(500).json({ error: 'Error updating item' });
        }
    }

    static async deleteItem(req, res) {
        try {
            const { itemId } = req.params;
            const { rowCount } = await pool.query(
                "DELETE FROM logins WHERE id = $1",
                [itemId]
            );

            if (!rowCount) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json({ message: "Item removed successfully" });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting item' });
        }
    }

    static async auth(req, res) {
        try {
            const { email } = req.body;
            const { rows } = await pool.query(
               "SELECT * FROM logins WHERE email = $1",
                [email]
            );

            if (!rows.length) {
                return res.json(false);
            }

            return res.json(true);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }
}
module.exports = LoginController;
