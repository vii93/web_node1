var con = require("./connect_data");


module.exports = function(app) {
    app.get('/api/show',function(req,res) {   
        con.query("select * from w_data;", function (err, result) {
           if (err) throw err;
           res.json(result);
        });
    });

    app.get('/admin/list_product', function(req,res) {
        con.query("select * from product_detail;", function(err,result) {
            if(err) throw err;
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
                throw err;
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
                throw err;
                result1.status = false;
                result1.msg = err.sqlMessage;
            }
            res.json(result1);
        });
    });

    app.post('/admin/add_new/:tb/:field_id', function(req,res) {
        con.query("insert into "+req.params.tb+"("+req.params.field_id+") select ifnull(max("+req.params.field_id+"),0)+1 from "+req.params.tb, function(err,result) {
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/admin/list_main_cate', function(req,res) {
        con.query("select * from main_category;", function(err,result) {
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/admin/get_main_cat/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from main_category where main_cate_id="+params, function(err,result) {
            if(err) throw err;
            res.json(result);
        });        
    });

    app.get('/admin/list_prod_cate', function(req,res) {
        con.query("select * from product_category;", function(err,result) {
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/admin/get_prod_cat/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from product_category where product_cate_id="+params, function(err,result) {
            if(err) throw err;
            res.json(result);
        });        
    });

    app.get('/admin/list_prod_type', function(req,res) {
        con.query("select * from product_type;", function(err,result) {
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/admin/get_prod_type/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from product_type where product_type_id="+params, function(err,result) {
            if(err) throw err;
            res.json(result);
        });        
    });

    app.get('/api/new_prod', function(req,res) {
        con.query("select * from product_detail where active=1 order by product_id desc limit 10;", function(err,result) {
            if(err) throw err;
            res.json(result);
        });        
    });

    app.get('/api/best_sell', function(req,res) {
        con.query("select * from product_detail where active=1 order by product_id  limit 10;", function(err,result) {
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/admin/get_prod_detail/:id',function(req,res) {
        var params = (req.params.id).replace(":","");
        con.query("select * from product_detail where product_id="+params, function(err,result) {
            if(err) throw err;
            res.json(result);
        });        
    });

    app.get('/api/list_cat_n_type',function(req,res) {
        var kq = {"cat":[],"type":[]};
        con.query("select product_cate_name,product_cate_id,seo_url from product_category where active=1", function(err,result) {
            if(err) throw err;
            kq.cat.push(result);
            con.query("select product_type_name,product_type_id,tb1.product_cate_id,tb1.seo_url as type_url,tb2.seo_url as cate_url from product_type tb1 left join  product_category tb2 on tb1.product_cate_id=tb2.product_cate_id where tb1.active=1", function(err,result) {
                if(err) throw err;
                kq.type.push(result);
                res.json(kq);
            });
        });        
    });

    app.get('/api/get_fast_search',function(req,res) {
        con.query("select * from product_detail where active=1 limit 50", function(err,result){
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/api/product_detail/:url',function(req,res) {
        var param = req.params.url.replace(":","");
        con.query("select * from product_detail where seo_url='"+param+"'", function(err,result){
            if(err) throw err;
            res.json(result);
        });
    });

    app.get('/api/test',function(req,res) {
        var result = [{img:"/innis/2.jpg"},{img:"/innis/3.jpg"},{img:"/innis/4.jpg"},{img:"/innis/5.jpg"},{img:"/innis/6.jpg"}]
        res.json(result);
    });

    app.post('/api/addcard/:ctk_id/:id', function(req,res) {
        var id= (req.params.id).replace(":","")
        var ctk_id= (req.params.ctk_id).replace(":","")
        // con.query("insert into basket(basket_id) select ifnull(max(basket_id),0)+1 from basket", function(err,result) {
        //     if(err) throw err;
        //     con.query("update basket set product_id="+id+", ckt_id="+ctk_id+" where basket_id=max(basket_id)",function(err,result1){
        //         if(err) throw err;
        //         res.json(result1);
        //     })            
        // });
        con.query("select * from basket_detail where ctk_id="+ctk_id,function(err,result) {
            if(err) {
                con.query("insert into basket_detail(basket_id) select ifnull(max(basket_id),0)+1 from basket_detail;update basket_detail set product_id="+id+", ctk_id='"+ctk_id+"' where basket_id=1;", function(err,result) {
                    if(err) throw err;     
                    console.log(result)     
                });
                
            }
            if(!result) {
                // con.query("update basket_detail set product_id="+id+", ctk_id="+ctk_id+" where basket_id=max(basket_id)",function(err,result1){
                //     if(err) throw err;
                //     console.log(id,90)
                //     res.json(result1);
                // });
            }
        })
    });
}

