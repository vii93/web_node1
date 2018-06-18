var con = require("./connect_data");


module.exports = function(app) {
    app.get('/api/show',function(req,res) {   
        con.query("select * from w_data;", function (err, result) {
           if (err) console.log(err);
           res.json(result);
        });
    });

    app.get('/admin/list_product', function(req,res) {
        con.query("select * from product_detail;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.post('/admin/update_prod/:col/:val/:id/:tb', function(req,res) {
        var where_field = "product_id";
        if(req.params.tb == "main_category")
            where_field = "main_cate_id";
        if(req.params.tb == "product_category")
            where_field = "product_cate_id";
        if(req.params.tb == "product_type")
            where_field = "product_type_id";
        var sql = "update "+req.params.tb+" set "+req.params.col+" = '"+encodeURI(req.params.val)+"' where "+where_field+"="+req.params.id
        con.query(sql, function(err,result) {
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
        con.query(sql, function(err,result) {
            var result1 = {"status":true,msg: result}
            if(err){
                console.log(err);
                result1.status = false;
                result1.msg = err.sqlMessage;
            }
            res.json(result1);
        });
    });

    app.post('/admin/add_new/:tb/:field_id', function(req,res) {
        con.query("insert into "+req.params.tb+"("+req.params.field_id+") select max("+req.params.field_id+")+1 from "+req.params.tb, function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/admin/list_main_cate', function(req,res) {
        con.query("select * from main_category;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/admin/get_main_cat/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from main_category where main_cate_id="+params, function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });        
    });

    app.get('/admin/list_prod_cate', function(req,res) {
        con.query("select * from product_category;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/admin/get_prod_cat/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from product_category where product_cate_id="+params, function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });        
    });

    app.get('/admin/list_prod_type', function(req,res) {
        con.query("select * from product_type;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/admin/get_prod_type/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from product_type where product_type_id="+params, function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });        
    });

    app.get('/api/new_prod', function(req,res) {
        con.query("select * from product_detail order by product_id desc limit 10;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });        
    });

    app.get('/api/best_sell', function(req,res) {
        con.query("select * from product_detail order by product_id limit 10;", function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/admin/get_prod_detail/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from product_detail where product_id="+params, function(err,result) {
            if(err) console.log(err);
            res.json(result);
        });        
    });

    app.get('/api/list_cat_n_type',function(req,res) {
        var kq = {"cat":[],"type":[]};
        con.query("select product_cate_name,product_cate_id from product_category where active=1", function(err,result) {
            if(err) console.log(err);
            kq.cat.push(result);
            con.query("select product_type_name,product_type_id from product_type where active=1", function(err,result) {
                if(err) console.log(err);
                kq.type.push(result);
                res.json(kq);
            });
        });        
    });

    app.get('/api/get_fast_search',function(req,res) {
        con.query("select * from product_detail limit 50", function(err,result){
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/api/product_detail/:url',function(req,res) {
        var param = req.params.url.replace(":","");
        con.query("select * from product_detail where seo_url='"+param+"'", function(err,result){
            if(err) console.log(err);
            res.json(result);
        });
    });

    app.get('/api/test',function(req,res) {
        var result = [{img:"/innis/2.jpg"},{img:"/innis/3.jpg"},{img:"/innis/4.jpg"},{img:"/innis/5.jpg"},{img:"/innis/6.jpg"}]
        res.json(result);
    });
}

