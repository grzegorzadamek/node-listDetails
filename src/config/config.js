const config = {
    development: {
        port: process.env.PORT || 3000,
        database: {
            connectionString: 'postgresql://retool:EzNsdMKW60HJ@ep-wandering-waterfall-a6z20yl0.us-west-2.retooldb.com/retool?sslmode=require'
        }
    },
    test: {
        port: 3001,
        database: {
            connectionString: 'postgresql://retool:EzNsdMKW60HJ@ep-wandering-waterfall-a6z20yl0.us-west-2.retooldb.com/retool?sslmode=require'
        }
    },
    production: {
        port: process.env.PORT,
        database: {
            connectionString: process.env.DATABASE_URL
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
