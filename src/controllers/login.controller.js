const pool = require('../config/database.js');

class LoginController {
    static async getAllItems(req, res) {
        try {
            const query = '%' + (req.query.query || '') + '%';
            const { owner } = req.body;
            const result = await pool.query(
                "SELECT * FROM items WHERE owner = $1 AND (name ILIKE $2 OR description ILIKE $2) ORDER BY id ASC",
                [owner, query]
            );

            const response = result.rows.map(({
                name,
                description,
                ...rest
            }) => ({
                name,
                description,
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
            const { owner } = req.body;

            const { rows } = await pool.query(
                "SELECT * FROM items WHERE id = $1 AND owner = $2",
                [itemId, owner]
            );

            if (!rows.length) {
                return res.status(404).json({ error: 'Item not found' });
            }

            const {name: name, description: description, ...rest} = rows[0];
            res.json({ name, description, ...rest });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching item' });
        }
    }

    static async addItem(req, res) {
        const { name, description, owner } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            await pool.query(
                "INSERT INTO items (name, description, owner) VALUES ($1, $2, $3)",
                [name, description, owner]
            );
            res.status(201).json({ message: "Item added successfully" });
        } catch (error) {
            res.status(500).json({ error: 'Error adding item' });
        }
    }

    static async updateItem(req, res) {
        const { id, name, description } = req.body;

        if (!id || !name || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const { rowCount } = await pool.query(
                "UPDATE items SET name = $1, description = $2 WHERE id = $3",
                [name, description, id]
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
                "DELETE FROM items WHERE id = $1",
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
