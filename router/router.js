var con = require("./connect_data");


module.exports = function(app) {
    app.get('/api/show',function(req,res) {   
        conn.query("select * from w_data;", function (err, result) {
           if (err) console.log(err);
           res.json(result);
        });
    });

    app.get('/admin/list_product', function(req,res) {
        conn.query("select * from product_detail;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.post('/admin/update_prod/:col/:val/:prod_id', function(req,res) {
        var sql = "update product_detail set "+req.params.col+" = '"+req.params.val+"' where prod_id="+req.params.prod_id
        conn.query(sql, function(err,result) {
            var result = {"status":true,msg: ""}
            if(err){
                console.log(err);
                result.status = false;
                result.msg = err.sqlMessage;
            }
            res.json(result);
        });
    });

    app.post('/admin/update_db/:val', function(req,res) {
        var sql = req.params.val;
        conn.query(sql, function(err,result) {
            var result1 = {"status":true,msg: result}
            if(err){
                console.log(err);
                result1.status = false;
                result1.msg = err.sqlMessage;
            }
            res.json(result1);
        });
    });

    app.post('/admin/add_new', function(req,res) {
        conn.query("insert into product_detail(prod_id) select max(prod_id)+1 from product_detail", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/api/new_prod', function(req,res) {
        con.query("select * from product_detail order by prod_id desc limit 10;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });        
    });

    app.get('/api/best_sell', function(req,res) {
        con.query("select * from product_detail order by prod_id limit 10;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/admin/get_prod_detail/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        conn.query("select * from product_detail where prod_id="+params, function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
        
    });
}

