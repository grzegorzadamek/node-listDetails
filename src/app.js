const express = require('express');
const loginRoutes = require('./routes/login.routes.js');
const middleware = require('./middleware');
const config = require('./config/config');
const logger = require('./utils/logger');

const app = express();

middleware.basic.forEach(mw => app.use(mw));
app.use('/api', loginRoutes);
app.use(middleware.errorHandler);
app.use(middleware.notFound);

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        logger.info(`Server running on port ${config.port}`);
    });
}

module.exports = app;