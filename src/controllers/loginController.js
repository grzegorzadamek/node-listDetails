const pg = require('pg');
const config = {
    connectionString: 'postgresql://retool:EzNsdMKW60HJ@ep-wandering-waterfall-a6z20yl0.us-west-2.retooldb.com/retool?sslmode=require'
};

const getAllItems = async (req, res) => {
    const client = new pg.Client(config);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT * FROM logins WHERE first_name ILIKE $1 OR last_name ILIKE $1 ORDER BY id ASC",
                       ['%' + (req.query.query || '') + '%'], function (err, result) {
            if (err)
                throw err;

            const response = result.rows.map(({
              first_name: firstName,
              last_name: lastName,
              ...rest
            }) => ({
              firstName,
              lastName,
              ...rest
            }));

            console.log(response);
            res.json(response);
            client.end(function (err) {
                if (err)
                    throw err;
            });
        });
    });
};

const getItemById = async (req, res) => {
    const client = new pg.Client(config);
    var itemId = req.params.itemId;
    console.log('Get itemId :: ', itemId);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT * FROM logins WHERE id = $1", [itemId], function (err, result) {
            const response = result.rows.map(({
              first_name: firstName,
              last_name: lastName,
              ...rest
            }) => ({
              firstName,
              lastName,
              ...rest
            }));

            console.log(response[0]);
            res.json(response[0]);
            client.end(function (err) {
                if (err)
                    throw err;
            });
        });
    });
};

const addItem = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log('Add item :: ', req.body);

    const client = new pg.Client(config);
    try {
        await client.connect();
        const result = await client.query(
            "INSERT INTO logins (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
            [firstName, lastName, email]
        );
        res.status(200).json("Add item successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error adding item");
    } finally {
        await client.end();
    }
};

const updateItem = async (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log('Update item :: ', req.body);

    const client = new pg.Client(config);
    try {
        await client.connect();
        const result = await client.query(
            "UPDATE logins SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
            [firstName, lastName, email, id]
        );
        res.status(200).json("Update item successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error updating item");
    } finally {
        await client.end();
    }
};

const deleteItem = async (req, res) => {
    const client = new pg.Client(config);
    var itemId = req.params.itemId;
    console.log('Delete itemId :: ', itemId);
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("DELETE FROM logins WHERE id = $1", [itemId], function (err, result) {
            res.status(200).json("Remove item successfully!");
            client.end(function (err) {
                if (err)
                    throw err;
            });
        });
    });
};

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};