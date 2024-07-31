const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "qweqwe",
    database: "newspaper",
});

try {
    pool.connect();
} catch (error) {
    console.log(error);
}

module.exports = pool