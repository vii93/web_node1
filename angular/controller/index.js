'use strict';
var mainApp = angular.module('MyApp',['ngRoute','ngSanitize']);

mainApp.config(function($routeProvider) {

    $routeProvider.
    when('/product_detail/:url', {
       templateUrl: 'webshop/detail.html',
       controller: "ProdCtrl"
    })
    .when('/', {
        templateUrl: 'webshop/homePage.html',
        controller: 'home'
    })
    .when('/checkout', {
        templateUrl: 'webshop/checkout.html',
        controller: 'checkout'
    })
    .when('/shop', {
        templateUrl: 'webshop/shops.html',
        controller: 'shopCtrl'
    });       
 });


mainApp.controller('ProdCtrl', function($scope,$http,$routeParams,$sce) {
   $http.get("/api/product_detail/:"+$routeParams.url).then(function(res) {
        $scope.prod = res.data[0];
        $scope.prod.long_desc = decodeURI(res.data[0].long_desc);
        $scope.prod.product_name = decodeURI(res.data[0].product_name);
        $scope.list_img = res.data[0].img_url.split(",");
        $scope.first_img = $scope.list_img[0];
        $scope.prod.prod_desc = decodeURI(res.data[0].prod_desc)   
   }); 
    $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }   
});

mainApp.controller('checkout', function($scope,$http,$window,myService) {
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }
    var total_amount = 0;
    $scope.payment_type = "cod";
    $scope.ship_cod_phi = 20000;
    $scope.ship_cod_phi_show = $scope.ship_cod_phi.toLocaleString('it-IT');
    $http.get('/api/get_basket/'+sess).then(function(res) {        
        $scope.basket = res.data;
        for(var i in res.data){            
            var img = (res.data[i].img_url).split(",");
            $scope.basket[i].img_url = img[0];
            $scope.basket[i].product_name = decodeURI(res.data[i].product_name)
            $scope.basket[i].total_item = Number(res.data[i].qty) * Number(res.data[i].product_price)
            $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.basket[i].total_item_show =  $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            total_amount += $scope.basket[i].total_item;
        }
        $scope.total_amount = total_amount;
        $scope.tien_tong = total_amount + $scope.ship_cod_phi;
        $scope.tien_tong_show = $scope.tien_tong.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    });

    $scope.payment_type_ship = function() {
        if($scope.payment_type == "ck") {
            $("#show_tai_khoan").show();
            $scope.ship_cod_phi = 0;
            $scope.tien_tong = total_amount - 20000;
            
            $scope.ship_cod_phi_show = $scope.ship_cod_phi.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        } else {
            $("#show_tai_khoan").hide();
            $scope.ship_cod_phi = 20000;
            $scope.ship_cod_phi_show = $scope.ship_cod_phi.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.tien_tong = total_amount + $scope.ship_cod_phi;
        $scope.tien_tong_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });

    }

    $scope.update_qty = function(id,qty){
        if(qty > 0 ) {
            var ctk_id = myService.updateQty( id,qty);
            var total = 0;
            for(var i in $scope.basket){
                if($scope.basket[i].product_id == id) {
                    $scope.basket[i].qty = $scope.basket[i].qty;
                    $scope.basket[i].total_item = Number($scope.basket[i].qty) * Number($scope.basket[i].product_price)
                    $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                    $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
                }
                total += $scope.basket[i].total_item;
            }
            $scope.total_amount = total;
            $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });

            $scope.tien_tong = $scope.total_amount + $scope.ship_cod_phi;
            $scope.tien_tong_show = $scope.tien_tong.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }        
    }

    $scope.delete_item = function(id) {
        $http.post("/api/delete_item/"+id+"/"+sess).then(function(res) {
            location.reload();
        })
    }

    $scope.docheckout = function(basket,cust,disc) {
        if(!cust.customer_name || !cust.customer_email || !cust.customer_address || !cust.customer_phone){
            alert("Thông tin cần thiết đang trống!!!")
            return false;
        }else {
            $http({url :'/api/send_email',method: "GET",params : {"basket":[basket], "cust":$scope.customer, "discount": disc, "total": $scope.tien_tong ,"payment": $scope.payment_type}}).then(function(res) {
                if(res.status == 200) {
                    $http('/api/remove_basket/'+sess).then(function(res) {

                    });
                    location.href = "#!/confirm_order/"+res.data;
                }
            })
        }
    }
});

mainApp.controller('home', function($scope,$http,$window,myService) {
    $scope.new_prod = [];
    $http.get('/api/new_prod').then(function(res) {
        for(var i in res.data){
            $scope.new_prod[i] = res.data[i];
            var img = res.data[i].img_url.split(",");
            $scope.new_prod[i].img_url = img[0];
            $scope.new_prod[i].product_price = $scope.new_prod[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            $scope.new_prod[i].product_name = decodeURI(res.data[i].product_name);
        }
    });
    $scope.best_sell =[];
    $http.get('/api/best_sell').then(function(res) {
        for(var i in res.data){
            $scope.best_sell[i] = res.data[i];
            var img = res.data[i].img_url.split(",");
            $scope.best_sell[i].img_url = img[0];
            $scope.best_sell[i].product_price = $scope.best_sell[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            $scope.best_sell[i].product_name = decodeURI(res.data[i].product_name);
        }       
    });
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }
    var total_amount = 0;
    $http.get('/api/get_basket/'+sess).then(function(res) {        
        $scope.basket = res.data;
        for(var i in res.data){            
            var img = (res.data[i].img_url).split(",");
            $scope.basket[i].img_url = img[0];
            $scope.basket[i].product_name = decodeURI(res.data[i].product_name)
            $scope.basket[i].total_item = Number(res.data[i].qty) * Number(res.data[i].product_price)
            $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            total_amount += $scope.basket[i].total_item;
            $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
        }
        $scope.total_amount = total_amount;
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    });

    $scope.addcard = function(id) {
        var ctk_id = myService.addToBasket(id);
        $http.get("/api/get_basket/"+id+"/"+ctk_id).then(function(res) {
            var temp = -1;
            if(res.data.length > 0) {
                for(var i in $scope.basket){
                    if($scope.basket[i].product_id == res.data[0].product_id) {
                        var old_qty = $scope.basket[i].qty;
                        $scope.basket[i].qty = res.data[0].qty;
                        $scope.basket[i].total_item = Number(res.data[0].qty) * Number(res.data[0].product_price);
                        $scope.total_amount -= Number(old_qty) * Number(res.data[0].product_price);
                        $scope.total_amount += Number(res.data[0].qty) * Number(res.data[0].product_price);
                        $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
                        $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                    } else {
                        temp++; 
                    }
                }
            }
            if(temp < $scope.basket.length) {
                var img = (res.data[0].img_url).split(",");
                $scope.basket.push(res.data[0]);
                $scope.basket[$scope.basket.length-1].img_url = img[0];
                $scope.basket[$scope.basket.length-1].product_name = decodeURI(res.data[0].product_name)
                $scope.basket[$scope.basket.length-1].total_item = Number(res.data[0].qty) * Number(res.data[0].product_price)
                $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
                $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            }
            $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        });
    }

    $scope.update_qty = function(id,qty){
        if(qty > 0 ) {
            var ctk_id = myService.updateQty( id,qty);
            var total = 0;
            for(var i in $scope.basket){
                if($scope.basket[i].product_id == id) {
                    $scope.basket[i].qty = $scope.basket[i].qty;
                    $scope.basket[i].total_item = Number($scope.basket[i].qty) * Number($scope.basket[i].product_price)
                    $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                    $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
                }
                total += $scope.basket[i].total_item;
            }
            $scope.total_amount = total;
            $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }        
    }
});


mainApp.controller('shopCtrl', function($scope,$http,myService,$window) {
    $http.get('/api/list_cat_n_type').then(function(res) {
        var kq1 = res.data.cat[0];
        var kq2 = res.data.type[0];
        for(var i in kq1){
            kq1[i].product_cate_name = decodeURI(kq1[i].product_cate_name);
            kq1[i].types = [];
            for(var j in kq2){
                if(kq1[i].product_cate_id == kq2[j].product_cate_id){
                    kq1[i].types.push(kq2[j]);
                    kq1[i].types[j].product_type_name = decodeURI(kq2[j].product_type_name)
                }else kq1[i].types = []
            }
        }
        console.log(kq1)
        $scope.menu_prod = kq1;
    });
    $scope.goto = function(obj) {
        var href = "#!/shop/product_type="+obj.type.type_url
        location.href=href;
    }
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }

    $scope.addcard = function(id) {
        var ctk_id = myService.addToBasket(id);
        $http.get("/api/get_basket/"+id+"/"+ctk_id).then(function(res) {
            var temp = -1;
            if(res.data.length > 0) {
                for(var i in $scope.basket){
                    if($scope.basket[i].product_id == res.data[0].product_id) {
                        var old_qty = $scope.basket[i].qty;
                        $scope.basket[i].qty = res.data[0].qty;
                        $scope.basket[i].total_item = Number(res.data[0].qty) * Number(res.data[0].product_price);
                        $scope.total_amount -= Number(old_qty) * Number(res.data[0].product_price);
                        $scope.total_amount += Number(res.data[0].qty) * Number(res.data[0].product_price);
                        $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
                        $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                    } else {
                        temp++; 
                    }
                }
            }
            if(temp < $scope.basket.length) {
                var img = (res.data[0].img_url).split(",");
                $scope.basket.push(res.data[0]);
                $scope.basket[$scope.basket.length-1].img_url = img[0];
                $scope.basket[$scope.basket.length-1].product_name = decodeURI(res.data[0].product_name)
                $scope.basket[$scope.basket.length-1].total_item = Number(res.data[0].qty) * Number(res.data[0].product_price)
                $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
                $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            }
            $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        });
    }

    $scope.update_qty = function(id,qty){
        if(qty > 0 ) {
            var ctk_id = myService.updateQty( id,qty);
            var total = 0;
            for(var i in $scope.basket){
                if($scope.basket[i].product_id == id) {
                    $scope.basket[i].qty = $scope.basket[i].qty;
                    $scope.basket[i].total_item = Number($scope.basket[i].qty) * Number($scope.basket[i].product_price)
                    $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
                    $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
                }
                total += $scope.basket[i].total_item;
            }
            $scope.total_amount = total;
            $scope.total_amount_show = $scope.total_amount.total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }        
    }

    $scope.product = [];
    $http.get('/api/get_fast_search').then(function(res) {
        for(var i in res.data){
            $scope.product[i] = res.data[i];
            $scope.product[i].product_name = decodeURI(res.data[i].product_name);
            var img = res.data[i].img_url.split(",");
            $scope.product[i].img_url = img[0];
            $scope.product[i].product_price = $scope.product[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            
        }
    });
    
    $http.get('/api/get_basket/'+sess).then(function(res) {
        var total_amount = 0;
        $scope.basket = res.data;
        for(var i in res.data){            
            var img = (res.data[i].img_url).split(",");
            $scope.basket[i].img_url = img[0];
            $scope.basket[i].product_name = decodeURI(res.data[i].product_name);
            $scope.basket[i].total_item = Number(res.data[i].qty) * Number(res.data[i].product_price);
            $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            total_amount += $scope.basket[i].total_item;
            $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount = total_amount;
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    });
});

mainApp.factory('myService', function($window,$http) {
    return {
        addToBasket: function(id) {
            var curent_sess = $window.sessionStorage.getItem("ctk_id");
            if(!curent_sess) {
                curent_sess = Math.random().toString(36).substring(7);
                $window.sessionStorage.setItem("ctk_id",sess);
            }
            
            $http.post('/api/addcard/'+curent_sess+'/'+id).then(function(res) {

            });
            return curent_sess;
        },
        updateQty: function(id, qty) {
            var curent_sess = $window.sessionStorage.getItem("ctk_id");
            if(!curent_sess) {
                curent_sess = Math.random().toString(36).substring(7);
                $window.sessionStorage.setItem("ctk_id",sess);
            }
            $http.post('/api/change_qty/'+curent_sess+'/'+id+'/'+qty).then(function(res) {

            });
            return curent_sess;
        }
    };
});