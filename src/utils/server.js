const PORT = process.env.PORT || 3000;

const serverConfig = {
    port: PORT,
    startMessage: () => console.log(`Server running on port ${PORT}`)
};

module.exports = serverConfig;
