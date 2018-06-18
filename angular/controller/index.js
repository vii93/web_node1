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
   }); 
    $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }   
});

mainApp.controller('checkout', function($scope,$http) {
   
});

mainApp.controller('home', function($scope,$http) {
    $scope.new_prod = [];
    $http.get('/api/new_prod').then(function(res) {
        for(var i in res.data){
            $scope.new_prod[i] = res.data[i];
            var img = res.data[i].img_url.split(",");
            $scope.new_prod[i].img_url = img[0];
        }
    });
    $scope.best_sell =[];
    $http.get('/api/best_sell').then(function(res) {
        for(var i in res.data){
            $scope.best_sell[i] = res.data[i];
            var img = res.data[i].img_url.split(",");
            $scope.best_sell[i].img_url = img[0];
        }       
    });
});


mainApp.controller('shopCtrl', function($scope,$http) {
    $http.get('/api/list_cat_n_type').then(function(res) {
        var kq1 = res.data.cat[0];
        var kq2 = res.data.type[0];
        for(var i in kq1){
            kq1[i].types = [];
            for(var j in kq2){
                if(kq1[i].product_cate_id == kq2[j].product_cate_id){
                    kq1[i].types.push(kq2[j]);
                }else kq1[i].types = []
            }
        }
        $scope.menu_prod = kq1;
    });
    $scope.product = [];
    $http.get('/api/get_fast_search').then(function(res) {
        for(var i in res.data){
            $scope.product[i] = res.data[i];
            $scope.product[i].product_name = decodeURI(res.data[i].product_name);
            var img = res.data[i].img_url.split(",");
            $scope.product[i].img_url = img[0];
        }
    });
});