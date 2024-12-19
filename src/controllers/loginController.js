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
    // kod z app.get('/item/:itemId')
};

const addItem = async (req, res) => {
    // kod z app.post('/item/add')
};

const updateItem = async (req, res) => {
    // kod z app.put('/item')
};

const deleteItem = async (req, res) => {
    // kod z app.delete('/item/:itemId')
};

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};
