var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "T@v14863258",
    database: "data"
  }); 

  con.connect(function(err) {
    if(err) throw err;
  })

module.exports = con;
