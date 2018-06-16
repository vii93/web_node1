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
    $http.get('/api/new_prod').then(function(res) {
      $scope.products1 = res.data[0];
      $scope.products2 = res.data[1];
      $scope.products3 = res.data[2];
      $scope.products4 = res.data[3];
      $scope.products5 = res.data[4];
      $scope.products6 = res.data[5];
      $scope.products7 = res.data[6];
      $scope.products8 = res.data[7];
      $scope.products9 = res.data[8];
      $scope.products10 = res.data[9];
    });
    $http.get('/api/best_sell').then(function(res) {
        $scope.best_sell1 = res.data[0];
        $scope.best_sell2 = res.data[1];
        $scope.best_sell3 = res.data[2];
        $scope.best_sell4 = res.data[3];
        $scope.best_sell5 = res.data[4];
        $scope.best_sell6 = res.data[5];
        $scope.best_sell7 = res.data[6];
        $scope.best_sell8 = res.data[7];
        $scope.best_sell9 = res.data[8];
        $scope.best_sell10 = res.data[9];
      });
});


mainApp.controller('shopCtrl', function($scope,$http) {
    $http.get('/api/list_cat_n_type').then(function(res) {
        var kq1 = res.data.cat[0];
        var kq2 = res.data.type[0];
        for(var i in kq1){
            kq1[i].types = [];
            for(var j in kq2){
                if(kq1[i].cat_id == kq2[j].cat_id){
                    kq1[i].types.push(kq2[j]);
                }                 
            }
        }
        $scope.menu_prod = kq1;       
    });
    $http.get('/api/new_prod').then(function(res) {
        $scope.product = res.data;
    });
});