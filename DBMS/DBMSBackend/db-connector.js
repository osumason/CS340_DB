const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_HOST,
    user              : process.env.DB_USER,
    password          : process.env.DB_PASS,
    database          : process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  // Ensure autocommit is true so threads don't lock snapshots
    autocommit: true
});

module.exports.pool = pool;