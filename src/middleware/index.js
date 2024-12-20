const express = require('express');
const cors = require('cors');

const middleware = {
    basic: [
        cors(),
        express.json(),
        express.urlencoded({ extended: false })
    ],

    errorHandler: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
    },

    notFound: (req, res) => {
        res.status(404).json({ error: 'Route not found' });
    }
};

module.exports = middleware;
