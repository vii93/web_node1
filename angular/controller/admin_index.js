var adminApp = angular.module('adminApp',['ngRoute']);

adminApp.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: './home_page.html'
    })
    .when('/p_id=1', {
        templateUrl: 'product_controller.html'
    })
    .when('/p_id=4', {
        templateUrl: 'console_database.html'
    })
    .when('/p_id=1/product_id=:id', {
        templateUrl: 'product_detail.html',
        controller: "EditProdCtrl"
    });     
 });

adminApp.controller('prodCtrl', function($scope,$http) {
    $scope.product = [];    
   $http.get('/admin/list_product').then(function(res) {
       for(var i=0; i< res.data.length; i++) {
           $scope.product.push(res.data[i]);
       }
   });
});

adminApp.controller('homeCtrl', function($scope) {

});

adminApp.controller('EditProdCtrl', function($scope,$routeParams,$http) {
    $http.get('/admin/get_prod_detail/:'+$routeParams.id).then(function(res) {
        $scope.prod = res.data[0];        
    });
});