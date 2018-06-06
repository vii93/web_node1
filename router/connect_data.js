var mysql = require("mysql");

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
  });

module.exports = con;