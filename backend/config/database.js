const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DBHOST,
    port: process.env.DBPORT || 5432,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    ssl: { rejectUnauthorized: false },

    max: 10, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 5000, 
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(1);
});

module.exports = pool;
