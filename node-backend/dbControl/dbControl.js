const mysql = require("mysql2/promise");
const config = require("config");
const databaseConfig = config.get("database");

module.exports.getConnection = async function createMyConnection() {
  return await mysql.createConnection(databaseConfig);
};
