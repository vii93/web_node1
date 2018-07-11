'use strict';
var mainApp = angular.module('MyApp',['ngRoute','ngSanitize']);

mainApp.service('MetaService', function() {
    var title = 'Web App';
    var metaDescription = '';
    var metaKeywords = '';
    return {
       set: function(newTitle, newMetaDescription, newKeywords,pT,pD,pI,pU) {
           metaKeywords = newKeywords;
           metaDescription = newMetaDescription;
           title = newTitle; 
           pTile = pT;
           pDesc = pD;
           pImg = pI;
           pUrl = pU;
       },
       metaTitle: function(){ return title; },
       metaDescription: function() { return metaDescription; },
       metaKeywords: function() { return metaKeywords; },
       pageTitle: function(){ return pTile; },
       pageDesc: function(){ return pDesc; },
       pageImage: function(){ return pImg ; },
       baseUrl: function(){ return pUrl ; }
    }
});

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
    })
    .when('/confirm_checkout/:order_id', {
        templateUrl: 'webshop/confirm_checkout.html',
        controller: 'confirmCtrl'
    })
    .when('/search/key=:key', {
        templateUrl: 'webshop/shops.html',
        controller: 'searchCtrl'
    })
    .when('/shop/product_type/:type', {
        templateUrl: 'webshop/shops.html',
        controller: 'searchTypeCtrl'
    });       
 });

mainApp.controller('confirmCtrl',function($scope,$http,$routeParams,$window){
    var sess = $window.sessionStorage.getItem("ctk_id");
    $http.get('/admin/list_order/'+$routeParams.order_id).then(function(res) {
        $scope.order = res.data[0];
        console.log($scope.order)
    });
    $scope.product = [];
    $http.get('/admin/order_detail/'+$routeParams.order_id).then(function(res) {
        var total_amount = 0;
       for(var i=0; i< res.data.length; i++) {
           $scope.product.push(res.data[i]);
           $scope.product[i].product_name = decodeURI($scope.product[i].product_name)
           $scope.product[i].total_item = Number(res.data[i].order_detail_price) * Number(res.data[i].order_detail_qty)
           $scope.product[i].total_item_show = $scope.product[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
           $scope.product[i].order_detail_price_show = $scope.product[i].order_detail_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
           total_amount += $scope.product[i].total_item;
        }
        
        $scope.total_amount_show = total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    });
    $http.get('/api/remove_basket/'+sess).then(function(res) {
        console.log("Success");
    });
    $window.sessionStorage.removeItem("ctk_id");
});

mainApp.controller('fastSearchCtrl', function($scope,$http,$routeParams,myService,$window) {
    var type = $routeParams.product_type;
    var key = $routeParams.key;
    $http.get('/api/list_cat_n_type').then(function(res) {
        var kq1 = res.data.cat[0];
        var kq2 = res.data.type[0];
        for(var i in kq1){
            kq1[i].product_cate_name = decodeURI(kq1[i].product_cate_name);
            kq1[i].types = [];
            for(var j in kq2){
                kq2[j].product_type_name = decodeURI(kq2[j].product_type_name)
                if(Number(kq1[i].product_cate_id) == Number(kq2[j].product_cate_id)){
                    kq1[i].types.push(kq2[j]);
                }
            }
        }
        $scope.menu_prod = kq1;
    });
    $scope.goto = function(obj) {
        var href = "#!/shop/product_type/"+obj.type.type_url
        location.href=href;
    }
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }

    $scope.addcard = function(prod) {
        openNav();
        var ctk_id = myService.addToBasket(prod.product_id);
        var temp = 0;
        for(var i in $scope.basket){
            if($scope.basket[i].product_id == prod.product_id) {
                var old_qty = $scope.basket[i].qty;
                $scope.basket[i].qty += 1;
                $scope.basket[i].total_item += Number(prod.product_price);
                $scope.total_amount +=  Number(prod.product_price);
                $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            } else {
                temp++; 
            }
        }          
        if(temp == $scope.basket.length) {
            
            $scope.basket.push(prod);
            $scope.basket[$scope.basket.length-1].img_url = prod.img_url;
            $scope.basket[$scope.basket.length-1].qty = 1;
            $scope.basket[$scope.basket.length-1].product_name = decodeURI(prod.product_name)
            $scope.basket[$scope.basket.length-1].total_item =  Number(prod.product_price)
            $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
            $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
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
    
    $http.get('/api/get_fast_search/product_type/'+key).then(function(res){
        for(var i in res.data){
            $scope.product[i] = res.data[i];
            $scope.product[i].product_name = decodeURI(res.data[i].product_name);
            $scope.product[i].product_price_show = $scope.product[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
    });    
    $http.get('/api/get_basket/'+sess).then(function(res) {
        var total_amount = 0;
        $scope.basket = res.data;
        for(var i in res.data){            
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

mainApp.controller('searchTypeCtrl', function($scope,$http,$routeParams,myService,$window) {
    var type = $routeParams.product_type;
    var key = $routeParams.type;
    $http.get('/api/list_cat_n_type').then(function(res) {
        var kq1 = res.data.cat[0];
        var kq2 = res.data.type[0];
        for(var i in kq1){
            kq1[i].product_cate_name = decodeURI(kq1[i].product_cate_name);
            kq1[i].types = [];
            for(var j in kq2){
                kq2[j].product_type_name = decodeURI(kq2[j].product_type_name)
                if(Number(kq1[i].product_cate_id) == Number(kq2[j].product_cate_id)){
                    kq1[i].types.push(kq2[j]);
                }
            }
        }
        $scope.menu_prod = kq1;
    });
    $scope.goto = function(obj) {
        var href = "#!/shop/product_type/"+obj.type.type_url
        location.href=href;
    }
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }

    $scope.addcard = function(prod) {
        openNav();
        var ctk_id = myService.addToBasket(prod.product_id);
        var temp = 0;
        for(var i in $scope.basket){
            if($scope.basket[i].product_id == prod.product_id) {
                var old_qty = $scope.basket[i].qty;
                $scope.basket[i].qty += 1;
                $scope.basket[i].total_item += Number(prod.product_price);
                $scope.total_amount +=  Number(prod.product_price);
                $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            } else {
                temp++; 
            }
        }          
        if(temp == $scope.basket.length) {
            
            $scope.basket.push(prod);
            $scope.basket[$scope.basket.length-1].img_url = prod.img_url;
            $scope.basket[$scope.basket.length-1].qty = 1;
            $scope.basket[$scope.basket.length-1].product_name = decodeURI(prod.product_name)
            $scope.basket[$scope.basket.length-1].total_item =  Number(prod.product_price)
            $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
            $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
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
    $http.get('/api/get_fast_search/product_type/'+key).then(function(res){
        for(var i in res.data){
            $scope.product[i] = res.data[i];
            $scope.product[i].product_name = decodeURI(res.data[i].product_name);
            $scope.product[i].product_price_show = $scope.product[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
    });    
    $http.get('/api/get_basket/'+sess).then(function(res) {
        var total_amount = 0;
        $scope.basket = res.data;
        for(var i in res.data){            
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

mainApp.controller('searchCtrl', function($scope,$http,$routeParams,myService,$window) {
    var key = $routeParams.key;
    $http.get('/api/list_cat_n_type').then(function(res) {
        var kq1 = res.data.cat[0];
        var kq2 = res.data.type[0];
        for(var i in kq1){
            kq1[i].product_cate_name = decodeURI(kq1[i].product_cate_name);
            kq1[i].types = [];
            for(var j in kq2){
                kq2[j].product_type_name = decodeURI(kq2[j].product_type_name)
                if(Number(kq1[i].product_cate_id) == Number(kq2[j].product_cate_id)){
                    kq1[i].types.push(kq2[j]);
                }
            }
        }
        $scope.menu_prod = kq1;
    });
    $scope.goto = function(obj) {
        var href = "#!/shop/product_type/"+obj.type.type_url
        location.href=href;
    }
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }

    $scope.addcard = function(prod) {
        openNav();
        var ctk_id = myService.addToBasket(prod.product_id);
        var temp = 0;
        for(var i in $scope.basket){
            if($scope.basket[i].product_id == prod.product_id) {
                var old_qty = $scope.basket[i].qty;
                $scope.basket[i].qty += 1;
                $scope.basket[i].total_item += Number(prod.product_price);
                $scope.total_amount +=  Number(prod.product_price);
                $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            } else {
                temp++; 
            }
        }          
        if(temp == $scope.basket.length) {
            
            $scope.basket.push(prod);
            $scope.basket[$scope.basket.length-1].img_url = prod.img_url;
            $scope.basket[$scope.basket.length-1].qty = 1;
            $scope.basket[$scope.basket.length-1].product_name = decodeURI(prod.product_name)
            $scope.basket[$scope.basket.length-1].total_item =  Number(prod.product_price)
            $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
            $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
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
    $http.get('/api/get_fast_search/search/'+key).then(function(res){
        for(var i in res.data){
            $scope.product[i] = res.data[i];
            $scope.product[i].product_name = decodeURI(res.data[i].product_name);
            $scope.product[i].product_price_show = $scope.product[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
    });    
    $http.get('/api/get_basket/'+sess).then(function(res) {
        var total_amount = 0;
        $scope.basket = res.data;
        for(var i in res.data){            
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

mainApp.controller('ProdCtrl', function($scope,$http,$routeParams,$sce,myService,$window) {
   $http.get("/api/product_detail/:"+$routeParams.url).then(function(res) {
        $scope.prod = res.data[0];
        $scope.prod.long_desc = (res.data[0].long_desc) ? decodeURI(res.data[0].long_desc) : "";
        $scope.prod.product_name = decodeURI(res.data[0].product_name);
        $scope.prod.product_price_show = $scope.prod.product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        $scope.prod.prod_desc = (res.data[0].prod_desc) ? decodeURI(res.data[0].prod_desc) : "";   
   }); 
    $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }   

    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }
    var total_amount = 0;
    $http.get('/api/get_basket/'+sess).then(function(res) {        
        $scope.basket = res.data;
        for(var i in res.data){            
            $scope.basket[i].product_name = decodeURI(res.data[i].product_name)
            $scope.basket[i].total_item = Number(res.data[i].qty) * Number(res.data[i].product_price)
            $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            total_amount += $scope.basket[i].total_item;
            $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
        }
        $scope.total_amount = total_amount;
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    });   

    $scope.show_big_img = function(img) {
        $(".img_prod").attr("src",img);
    }

    $scope.addcard = function(prod) {
        openNav();
        var ctk_id = myService.addToBasket(prod.product_id);
        var temp = 0;
        for(var i in $scope.basket){
            if($scope.basket[i].product_id == prod.product_id) {
                var old_qty = $scope.basket[i].qty;
                $scope.basket[i].qty += 1;
                $scope.basket[i].total_item += Number(prod.product_price);
                $scope.total_amount +=  Number(prod.product_price);
                $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            } else {
                temp++; 
            }
        }          
        if(temp == $scope.basket.length) {
            
            $scope.basket.push(prod);
            $scope.basket[$scope.basket.length-1].img_url = prod.img_url;
            $scope.basket[$scope.basket.length-1].qty = 1;
            $scope.basket[$scope.basket.length-1].product_name = decodeURI(prod.product_name)
            $scope.basket[$scope.basket.length-1].total_item =  Number(prod.product_price)
            $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
            $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
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
        if(res.data.length <=0){
            $window.location.href = '#'; 
        } 
        console.log(res.data.length)     
        $scope.basket = res.data;
        for(var i in res.data){            
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
        if( !cust||!cust.customer_name || !cust.customer_email || !cust.customer_address || !cust.customer_phone){
            alert("Thông tin cần thiết đang trống!!!")
            return false;
        }else {
            $http({url :'/api/send_email',method: "GET",params : {"basket":[basket], "cust":$scope.customer, "discount": disc, "total": $scope.tien_tong,"total_show":$scope.tien_tong_show ,"payment": $scope.ship_cod_phi_show}}).then(function(res) {
                if(res.status == 200) {
                    if(res.data == false) {
                        alert("Không thể hoàn thành đơn hàng vui lòng thử lại sau!")
                    } else
                        location.href = "#!/confirm_checkout/"+res.data;
                }
            });            
        }
    }
});


mainApp.controller('home', function($scope,$http,$window,myService,MetaService,$rootScope) {
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Vighti","Chuyên buôn bán mỹ phẩm chính hãng chất lượng","vighti,vighticosmetic","VightiCosmetic","Mỹ phẩm thật","","");

    $scope.new_prod = [];
    $http.get('/api/new_prod').then(function(res) {
        for(var i in res.data){
            $scope.new_prod[i] = res.data[i];
            $scope.new_prod[i].product_price_show = $scope.new_prod[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            $scope.new_prod[i].product_name = decodeURI(res.data[i].product_name);
        }
    });
    $scope.best_sell =[];
    $http.get('/api/best_sell').then(function(res) {
        for(var i in res.data){
            $scope.best_sell[i] = res.data[i];
            $scope.best_sell[i].product_price_show = $scope.best_sell[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
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
            $scope.basket[i].product_name = decodeURI(res.data[i].product_name)
            $scope.basket[i].total_item = Number(res.data[i].qty) * Number(res.data[i].product_price)
            $scope.basket[i].product_price_show = $scope.basket[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            total_amount += $scope.basket[i].total_item;
            $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
        }
        $scope.total_amount = total_amount;
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    });

    $scope.addcard = function(prod) {
        openNav();
        var ctk_id = myService.addToBasket(prod.product_id);
        var temp = 0;
        for(var i in $scope.basket){
            if($scope.basket[i].product_id == prod.product_id) {
                var old_qty = $scope.basket[i].qty;
                $scope.basket[i].qty += 1;
                $scope.basket[i].total_item += Number(prod.product_price);
                $scope.total_amount +=  Number(prod.product_price);
                $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            } else {
                temp++; 
            }
        }          
        if(temp == $scope.basket.length) {
            
            $scope.basket.push(prod);
            $scope.basket[$scope.basket.length-1].qty = 1;
            $scope.basket[$scope.basket.length-1].product_name = decodeURI(prod.product_name)
            $scope.basket[$scope.basket.length-1].total_item =  Number(prod.product_price)
            $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
            $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
    
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
                kq2[j].product_type_name = decodeURI(kq2[j].product_type_name)
                if(Number(kq1[i].product_cate_id) == Number(kq2[j].product_cate_id)){
                    kq1[i].types.push(kq2[j]);
                }
            }
        }
        $scope.menu_prod = kq1;
    });
    $scope.goto = function(obj) {
        var href = "#!/shop/product_type/"+obj.type.type_url
        location.href=href;
    }
    var sess = $window.sessionStorage.getItem("ctk_id");
    if(!sess) {
        var sess = Math.random().toString(36).substring(7);
        $window.sessionStorage.setItem("ctk_id",sess);
    }

    $scope.addcard = function(prod) {
        openNav();
        var ctk_id = myService.addToBasket(prod.product_id);
        var temp = 0;
        for(var i in $scope.basket){
            if($scope.basket[i].product_id == prod.product_id) {
                var old_qty = $scope.basket[i].qty;
                $scope.basket[i].qty += 1;
                $scope.basket[i].total_item += Number(prod.product_price);
                $scope.total_amount +=  Number(prod.product_price);
                $scope.basket[i].total_item_show = $scope.basket[i].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
            } else {
                temp++; 
            }
        }          
        if(temp == $scope.basket.length) {
            
            $scope.basket.push(prod);
            $scope.basket[$scope.basket.length-1].img_url = prod.img_url;
            $scope.basket[$scope.basket.length-1].qty = 1;
            $scope.basket[$scope.basket.length-1].product_name = decodeURI(prod.product_name)
            $scope.basket[$scope.basket.length-1].total_item =  Number(prod.product_price)
            $scope.basket[$scope.basket.length-1].product_price_show = $scope.basket[$scope.basket.length-1].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' })
            $scope.total_amount += $scope.basket[$scope.basket.length-1].total_item;
            $scope.basket[$scope.basket.length-1].total_item_show =    $scope.basket[$scope.basket.length-1].total_item.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
        $scope.total_amount_show = $scope.total_amount.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
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
            $scope.product[i].product_price_show = $scope.product[i].product_price.toLocaleString('it-IT',{ style: 'currency', currency: 'VND' });
        }
    });
    
    $http.get('/api/get_basket/'+sess).then(function(res) {
        var total_amount = 0;
        $scope.basket = res.data;
        for(var i in res.data){            
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