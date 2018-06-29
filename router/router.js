var pool = require("./connect_data");
var nodemailer = require('nodemailer');




module.exports = function (app) {
    app.get('/api/show', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from w_data;", function (err, result) {
                if (err) throw err;
                res.json(result);
                con.end();
            });
        })


    });

    app.get('/admin/list_product', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from product_detail;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.post('/admin/update_prod/:col/:val/:id/:tb', function (req, res) {
        var where_field = "product_id";
        if (req.params.tb == "main_category")
            where_field = "main_cate_id";
        if (req.params.tb == "product_category")
            where_field = "product_cate_id";
        if (req.params.tb == "product_type")
            where_field = "product_type_id";
        var sql = "update " + req.params.tb + " set " + req.params.col + " = '" + encodeURI(req.params.val) + "' where " + where_field + "=" + req.params.id
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query(sql, function (err, result) {
                var result = { "status": true, msg: "" }
                if (err) {
                    throw err;
                    result.status = false;
                    result.msg = err.sqlMessage;
                }
                res.json(result);
                con.end();
            });
        });
    });

    app.post('/admin/update_db/:val', function (req, res) {
        var sql = req.params.val;
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query(sql, function (err, result) {
                var result1 = { "status": true, msg: result }
                if (err) {
                    throw err;
                    result1.status = false;
                    result1.msg = err.sqlMessage;
                }
                res.json(result1);
                con.end();
            });
        });
    });

    app.post('/admin/add_new/:tb/:field_id', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("insert into " + req.params.tb + "(" + req.params.field_id + ") select ifnull(max(" + req.params.field_id + "),0)+1 from " + req.params.tb, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/list_main_cate', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from main_category;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/get_main_cat/:id', function (req, res) {
        var params = (req.params.id).replace(":", "");
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from main_category where main_cate_id=" + params, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/list_prod_cate', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from product_category;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/get_prod_cat/:id', function (req, res) {
        var params = (req.params.id).replace(":", "");
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from product_category where product_cate_id=" + params, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/list_prod_type', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from product_type;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/get_prod_type/:id', function (req, res) {
        var params = (req.params.id).replace(":", "");
        pool.getConnection(function (err, con) {
            if (err) {
                throw err;
            }
            con.query("select * from product_type where product_type_id=" + params, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/api/new_prod', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) {
                throw err;
            }
            con.query("select product_id,product_name,seo_url,img_url,img_alt,product_price,product_sale_price from product_detail where active=1 order by product_id desc limit 10;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });
    app.get('/api/best_sell', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select product_id,product_name,seo_url,img_url,img_alt,product_price,product_sale_price from product_detail where active=1 order by product_id  limit 50;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/get_prod_detail/:id', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var params = (req.params.id).replace(":", "");
            con.query("select * from product_detail where product_id=" + params, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/api/list_cat_n_type', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var kq = { "cat": [], "type": [] };
            con.query("select product_cate_name,product_cate_id,seo_url from product_category where active=1", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                kq.cat.push(result);
                con.query("select product_type_name,product_type_id,tb1.product_cate_id,tb1.seo_url as type_url,tb2.seo_url as cate_url from product_type tb1 left join  product_category tb2 on tb1.product_cate_id=tb2.product_cate_id where tb1.active=1", function (err, result) {
                    if (err) { con.end(); console.error(err); return; }
                    kq.type.push(result);
                    res.json(kq);
                    con.end();
                });
            });
        });
    });
    app.get('/api/get_fast_search', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from product_detail where active=1 limit 50", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/api/get_fast_search/:type/:key', function (req, res) {
        var type = req.params.type.replace(":", "");
        var key = req.params.key.replace(":", "");
        var sql_where = "";
        if( type == "product_type"){
            sql_where = "prod_type_url='"+key+"'";
        } else if( type == "search") {
            sql_where = "product_name like ('%"+key+"%') or prod_desc like("+key+") or long_desc like ('%"+key+"%')"
        }
        pool.getConnection(function (err, con) {
            if (err) throw err
            var sql = "select * from product_detail where active=1 and "+sql_where;
            console.log(sql)
            con.query(sql, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/api/product_detail/:url', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var param = req.params.url.replace(":", "");
            con.query("select * from product_detail where seo_url='" + param + "'", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.post('/api/addcard/:ctk_id/:id', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var id = (req.params.id).replace(":", "")
            var ctk_id = (req.params.ctk_id).replace(":", "")
            con.query("select basket_id from basket_detail where product_id=" + id + " and ctk_id='" + ctk_id + "'", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                if (result.length < 1) {
                    con.query("INSERT INTO basket_detail( basket_id, product_id, ctk_id,qty ) SELECT ifnull(MAX( basket_id ),0) + 1, '" + id + "', '" + ctk_id + "', 1 FROM basket_detail;", function (err, result) {
                        if (err) { con.end(); console.error(err); return; }
                        res.json(result);
                        con.end();
                    });
                } else {
                    con.query("update basket_detail set qty = (qty+1) where basket_id=" + result[0].basket_id, function (err, result) {
                        if (err) { con.end(); console.error(err); return; }
                        res.json(result);
                        con.end();
                    });
                }
            });
        });
    });
    app.post('/api/change_qty/:ctk_id/:id/:qty', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var ctk_id = (req.params.ctk_id).replace(":", "")
            var id = (req.params.id).replace(":", "")
            var qty = (req.params.qty).replace(":", "")
            var sql = "update basket_detail set qty = " + qty + " where ctk_id='" + ctk_id + "' and product_id=" + id;
            con.query(sql, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });
    app.get('/api/get_basket/:ctk_id', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var ctk_id = (req.params.ctk_id).replace(":", "")
            con.query("select tb1.product_id,tb2.product_name,tb2.seo_url,tb2.img_url,tb2.img_alt,tb2.product_price,tb2.product_sale_price,tb1.qty from basket_detail tb1 left join product_detail tb2 on tb1.product_id=tb2.product_id where tb1.ctk_id='" + ctk_id + "'", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });
    app.get("/api/get_basket/:id/:ctk_id", function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var id = (req.params.id).replace(":", "");
            var ctk_id = (req.params.ctk_id).replace(":", "")
            var sql = "select tb1.product_id,tb2.product_name,tb2.seo_url,tb2.img_url,tb2.img_alt,tb2.product_price,tb2.product_sale_price,tb1.qty from basket_detail tb1 join product_detail tb2 on tb1.product_id=tb2.product_id where tb1.product_id='" + id + "' and tb2.active=1 and tb1.ctk_id = '" + ctk_id + "'";
            con.query(sql, function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/admin/list_discount', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            con.query("select * from discount_code;", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/api/remove_basket/:ctk_id', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var ctk_id = req.params.ctk_id.replace(":", "");
            con.query("delete from basket_detail where ctk_id='" + ctk_id + "';", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.post('/api/delete_item/:id/:ctk_id', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var ctk_id = req.params.ctk_id.replace(":", "");
            var id = req.params.id.replace(":", "");
            con.query("delete from basket_detail where ctk_id='" + ctk_id + "' and product_id='" + id + "';", function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });

    app.get('/api/send_email', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var params = req.query;
            var basket = JSON.parse(params.basket);
            if (params.cust)
                var cust = JSON.parse(params.cust);
            var discount = params.discount ? params.discount : '';
            var total = params.total;
            var payment = params.payment;
            var order_id = 0;
            var sql = "select ifnull(max(order_id),0) +1 as max_id from order_edit;";
            con.query(sql, function (err, result) {
                if (err) {
                    console.error(err);
                    con.end();
                    return;
                }
                order_id = result[0].max_id;
                sql = "insert into order_edit (order_id,order_value, customer_name,customer_address,customer_phone,customer_email,customer_msg,order_status,discount_code,payment_type,order_date) values ('" + result[0].max_id + "', '" + total + "','" + cust.customer_name + "','" + cust.customer_address + "','" + cust.customer_phone + "','" + cust.customer_email + "','" + cust.customer_msg + "','new','" + discount + "','" + payment + "', now()) ;"
                con.query(sql, function (err, res1) {
                    if (err) {
                        console.error(err);
                        con.end();
                        return;
                    }
                });
                for (var i in basket) {
                    sql = "insert into order_detail (order_detail_id,order_id,product_id,order_detail_qty,order_detail_price) select ifnull(max(order_detail_id),0)+1, '" + result[0].max_id + "', '" + basket[i].product_id + "', '" + basket[i].qty + "', '" + basket[i].total_item + "' from order_detail;"
                    con.query(sql, function (err, res2) {
                        if (err) {
                            console.error(err);
                            con.end();
                            return;
                        }
                    });
                }
                var transporter = nodemailer.createTransport({ // config mail server
                    service: 'Gmail',
                    auth: {
                        user: 'order.vighticosmetic@gmail.com',
                        pass: '14863258'
                    }
                });
                var mail_body = "";
                mail_body += "<h3>Xác thực đơn hàng</h3>";
                mail_body += '<p>Cảm ơn bạn đã order hàng của shop</p>';
                mail_body += '<h3>Thông tin thanh toán</h3>';
                mail_body += '<p>Tiền ship sẽ được tính riêng dựa vào địa chỉ mà bạn cung cấp</p>';
                if (payment == "ck") {
                    mail_body += '<p>Bạn đã chon hình thức chuyển khoản qua ngân hàng.</p>' +
                        '<p> Thanh toán qua số tài khoản : </p>' +
                        '<p>    - Chủ thẻ: Trần Nhật Thảo Vi </p>' +
                        '<p>    - Ngân hàng Quốc tế VIB chi nhánh Tôn Đức Thắng TP.HCM </p>' +
                        '<p>    - Số tài khoản: 686704060169770</p>' +
                        '<p>Luy ý: Khi chuyển khoản vui lòng nhập mã số đơn hàng vào phần lời nhắn lúc thanh toán để giúp chúng tôi xác nhận dơn hàng chính xác hơn </p>';
                } else {
                    mail_body += '<p>Bạn đã chọn thanh toán khi nhận hàng (Ship COD). Chúng tôi sẽ có gắng giao hàng trong thời gian sớm nhất sau khi xác nhận đơn hàng.</p>';
                }
                mail_body += '<p>Tiền ship sẽ được tính riêng dựa vào địa chỉ mà bạn cung cấp</p>'
                    + '<p>Vui lòng kiểm tra thật kỹ đơn hàng và thông báo cho chúng tôi nếu có bất cứ sửa đổi nào trong thời gian sớm</p>';
                mail_body += '<h3>Thông tin giao hàng</h3>';
                mail_body += '<div> <div style="float: left; width: 400px;margin-bottom: 10px;">'
                mail_body += '    <p>Họ Tên: ' + cust.customer_name + '</p>'
                mail_body += '    <p>Địa chỉ: ' + cust.customer_address + '</p>'
                mail_body += '    <p>SDT: ' + cust.customer_phone + '</p>'
                mail_body += '    <p>Email: ' + cust.customer_email + '</p>'
                mail_body += '    <p>Ghi chú: ' + cust.customer_msg + '</p>'
                mail_body += '</div>'
                mail_body += '<div>'
                mail_body += '    <p>Mã đơn hàng: ' + order_id + '</p>'
                mail_body += '    <p>Ngày mua: ' + Date() + '</p>'
                mail_body += '</div>    </div>';
                mail_body += '<div style="width: 100%; display: grid;clear: both;margin: auto;">'
                    + '<table>'
                    + '        <tr>'
                    + '            <th style="text-align: center;">Sản phẩm</th>'
                    + '            <th style="text-align: center;">Giá</th>'
                    + '            <th style="text-align: center;">Số lượng</th>'
                    + '            <th style="text-align: center;">Tổng tiền</th>'
                    + '        </tr>';
                for (var i in basket) {
                    mail_body += '<tr>';
                    mail_body += '<td style="text-align: center;">' + basket[i].product_name + ' </td>';
                    mail_body += '<td style="text-align: center;">' + basket[i].product_price_show + ' </td>';
                    mail_body += '<td style="text-align: center;"> ' + basket[i].qty + '</td>';
                    mail_body += '<td style="text-align: center;">' + basket[i].total_item_show + ' </td>';
                    mail_body += '<tr>';
                }
                mail_body += '<tr> <td></td><td></td>'
                    + '<td style="float:right">Phí Ship COD</td>'
                    + '<td  style="text-align: center;">' + payment + '</td> </tr>';
                mail_body += ' <tr> <td></td><td></td><td  style="float:right">Tổng thanh toán</td>';
                mail_body += '<td  style="text-align: center;">' + total + '</td></tr>';
                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'Vighticosmetic',
                    to: cust.customer_email,
                    subject: 'Xác nhận đơn hàng ' + order_id,
                    html: mail_body
                }
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        res.json(false)
                    } else {
                        console.log('Message sent: ' + info.response);
                        res.json(order_id)
                    }
                });
                con.end();
            })
        });
    });

    app.get('/api/search/order_by:key', function (req, res) {
        pool.getConnection(function (err, con) {
            if (err) throw err
            var param = req.params.key.replace(":", "");
            con.query("select * from product_detail order by product_id  " + param , function (err, result) {
                if (err) { con.end(); console.error(err); return; }
                res.json(result);
                con.end();
            });
        });
    });
}

