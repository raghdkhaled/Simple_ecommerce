const config = require("config");
const mysql = require("mysql");
const databaseConfig = config.get("database");
const pool = mysql.createPool(databaseConfig);

module.exports = pool;
