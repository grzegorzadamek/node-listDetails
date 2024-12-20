const logger = {
    info: (message) => {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    },
    error: (message, error) => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
    },
    debug: (message) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`);
        }
    }
};

module.exports = logger;
