const pool = require('../config/database');

class LoginController {
    static async getAllItems(req, res) {
        try {
            const query = '%' + (req.query.query || '') + '%';
            const { rows } = await pool.query(
                "SELECT * FROM logins WHERE first_name ILIKE $1 OR last_name ILIKE $1 ORDER BY id ASC",
                [query]
            );

            const response = rows.map(({
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
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getItem(req, res) {
        try {
            const { itemId } = req.params;
            const { rows } = await pool.query(
                "SELECT * FROM logins WHERE id = $1",
                [itemId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }

            const response = {
                firstName: rows[0].first_name,
                lastName: rows[0].last_name,
                ...rows[0]
            };

            return res.json(response);
        } catch (error) {
            console.error('Error in getItem:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async addItem(req, res) {
        try {
            const { firstName, lastName, email } = req.body;

            if (!firstName || !lastName || !email) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            await pool.query(
                "INSERT INTO logins (first_name, last_name, email) VALUES ($1, $2, $3)",
                [firstName, lastName, email]
            );

            return res.status(201).json({ message: "Item added successfully" });
        } catch (error) {
            console.error('Error in addItem:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateItem(req, res) {
        try {
            const { id, firstName, lastName, email } = req.body;

            if (!id || !firstName || !lastName || !email) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const { rowCount } = await pool.query(
                "UPDATE logins SET first_name = $1, last_name = $2, email = $3 WHERE id = $4",
                [firstName, lastName, email, id]
            );

            if (rowCount === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }

            return res.json({ message: "Item updated successfully" });
        } catch (error) {
            console.error('Error in updateItem:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteItem(req, res) {
        try {
            const { itemId } = req.params;
            const { rowCount } = await pool.query(
                "DELETE FROM logins WHERE id = $1",
                [itemId]
            );

            if (rowCount === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }

            return res.json({ message: "Item removed successfully" });
        } catch (error) {
            console.error('Error in deleteItem:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = LoginController;
