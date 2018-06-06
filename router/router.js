var con = require("./connect_data");

module.exports = function(app) {
    app.get('/api/show',function(req,res) {   
        con.getConnection(function(err,conn) {
            if (err) console.log(err);
            console.log("Connected!");
            conn.query("select * from w_data;", function (err, result) {
                conn.releaseConnection;
                if (err) console.log(err);
                
                res.json(result);
              });
          });    
    });

    app.get('/admin/list_product', function(req,res) {
        con.getConnection(function(err,conn) {
            if(err) console.log(err);
            conn.query("select * from product_detail;", function(err,result) {
                conn.releaseConnection;
                if(err) console.log(err);
                res.json(result);
            });
        });
    });

    app.post('/admin/add_new', function(req,res) {
        con.getConnection(function(err,conn) {
            if(err) console.log(err);
            conn.query("insert into product_detail(id) select max(id)+1 from product_detail", function(err,result) {
                conn.releaseConnection;
                if(err) console.log(err);
                res.json(result);
            });
        });
    });

    app.get('/api/new_prod', function(req,res) {
        con.getConnection(function(err,conn) {
            if(err) console.log(err);
            conn.query("select * from product_detail order by id desc limit 10;", function(err,result) {
                conn.releaseConnection;
                if(err) console.log(err);
                res.json(result);
            });
        });
    });

    app.get('/api/best_sell', function(req,res) {
        con.getConnection(function(err,conn) {
            if(err) console.log(err);
            conn.query("select * from product_detail order by id limit 10;", function(err,result) {
                conn.releaseConnection;
                if(err) console.log(err);
                res.json(result);
            });
        });
    });
}
