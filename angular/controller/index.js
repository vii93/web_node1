'use strict';
var mainApp = angular.module('MyApp',['ngRoute']);

mainApp.config(function($routeProvider) {

    $routeProvider.
    when('/product_detail/:id1/:id2', {
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
    });       
 });


mainApp.controller('ProdCtrl', function($scope,$http) {
   
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
