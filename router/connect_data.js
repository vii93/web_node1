var mysql = require("mysql");

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "T@v14863258",
  database: "data"
});

module.exports = con;
