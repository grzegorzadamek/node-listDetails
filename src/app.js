const express = require('express');
const loginRoutes = require('./routes/login.routes.js');
const middleware = require('./middleware');

const app = express();

// Apply basic middleware
middleware.basic.forEach(mw => app.use(mw));

// Routes
app.use('/api', loginRoutes);

// Error handling middleware
app.use(middleware.errorHandler);
app.use(middleware.notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
