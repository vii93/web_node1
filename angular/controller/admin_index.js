var adminApp = angular.module('adminApp',['ngRoute']);

adminApp.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: './home_page.html'
    })
    .when('/p_id=1', {
        templateUrl: 'product_controller.html'
    })
    .when('/p_id=1/product_id=:id', {
        templateUrl: 'product_detail.html',
        controller: "EditProdCtrl"
    })
    .when('/p_id=4', {
        templateUrl: 'console_database.html'
    })    
    .when('/p_id=2', {
        templateUrl: 'main_cate_ctrl.html',
        controller: "MainCatCtrl"
    })
    .when('/p_id=2/main_cate=:id', {
        templateUrl: 'main_cate_detail.html',
        controller: "EditMainCateCtrl"
    })
    .when('/p_id=3', {
        templateUrl: 'prod_cate_ctrl.html',
        controller: "ProdCatCtrl"
    })
    .when('/p_id=3/prod_cate=:id', {
        templateUrl: 'prod_cate_detail.html',
        controller: "EditProdCateCtrl"
    })
    .when('/p_id=5', {
        templateUrl: 'prod_type_ctrl.html',
        controller: "ProdTypeCtrl"
    })
    .when('/p_id=5/prod_type=:id', {
        templateUrl: 'prod_type_detail.html',
        controller: "EditProdType"
    })
    .when('/p_id=6', {
        templateUrl: 'discount_ctrl.html',
        controller: "DiscountCtrl"
    })
    .when('/p_id=7', {
        templateUrl: 'order_ctrl.html',
        controller: "OrderCtrl"
    })
    .when('/p_id=7/order_id=:id', {
        templateUrl: 'order_detail.html',
        controller: "EditOrder"
    });     
});

adminApp.controller('EditOrder', function($scope,$http,$routeParams) {
    $scope.product = [];    
    $http.get('/admin/order_detail/'+$routeParams.id).then(function(res) {
       for(var i=0; i< res.data.length; i++) {
           $scope.product.push(res.data[i]);
           $scope.product[i].product_name = decodeURI($scope.product[i].product_name)
           $scope.product[i].total = Number(res.data[i].order_detail_price) * Number(res.data[i].order_detail_qty)
       }
    });
    $http.get('/admin/list_order/'+$routeParams.id).then(function(res) {
        $scope.order = res.data[0];
    });
});

adminApp.controller('OrderCtrl', function($scope,$http) {
    $scope.order = [];    
    $http.get('/admin/list_order').then(function(res) {
        $scope.order = res.data;
    });
});

adminApp.controller('DiscountCtrl', function($scope,$http) {
    $scope.discount = [];    
    $http.get('/admin/list_discount').then(function(res) {
       for(var i=0; i< res.data.length; i++) {
           $scope.discount.push(res.data[i]);
       }
    });
});

adminApp.controller('prodCtrl', function($scope,$http) {
    $scope.product = [];    
    $http.get('/admin/list_product').then(function(res) {
       for(var i=0; i< res.data.length; i++) {
           $scope.product.push(res.data[i]);
           $scope.product[i].product_name = decodeURI($scope.product[i].product_name);
       }
    });
});

adminApp.controller('homeCtrl', function($scope) {

});

adminApp.controller('EditProdCtrl', function($scope,$routeParams,$http) {
    $http.get('/admin/get_prod_detail/:'+$routeParams.id).then(function(res) {
        $scope.prod = res.data[0];  
        $scope.prod.long_desc = decodeURI(res.data[0].long_desc)   
        $scope.prod.product_name = decodeURI(res.data[0].product_name)  
        $scope.prod.prod_desc = decodeURI(res.data[0].prod_desc)   
    });
});

adminApp.controller('MainCatCtrl', function($scope,$http) {
    $scope.main_cate = [];    
    $http.get('/admin/list_main_cate').then(function(res) {
       for(var i=0; i< res.data.length; i++) {
           $scope.main_cate.push(res.data[i]);
           $scope.main_cate[i].main_cate_name = decodeURI(res.data[i].main_cate_name);
       }
    });
});

adminApp.controller('EditMainCateCtrl', function($scope,$routeParams,$http) {
    $http.get('/admin/get_main_cat/:'+$routeParams.id).then(function(res) {
        $scope.main_cate = res.data[0];
        $scope.main_cate.main_cate_name = decodeURI(res.data[0].main_cate_name);
    });
});

adminApp.controller('ProdCatCtrl', function($scope,$http) {
    $scope.prod_cate = [];    
    $http.get('/admin/list_prod_cate').then(function(res) {
       for(var i=0; i< res.data.length; i++) {
           $scope.prod_cate.push(res.data[i]);
           $scope.prod_cate[i].product_cate_name = decodeURI(res.data[i].product_cate_name);
       }
    });
});

adminApp.controller('EditProdCateCtrl', function($scope,$routeParams,$http) {
    $http.get('/admin/get_prod_cat/:'+$routeParams.id).then(function(res) {
        $scope.prod_cate = res.data[0];
        $scope.prod_cate.product_cate_name = decodeURI(res.data[0].product_cate_name);
    });
});

adminApp.controller('ProdTypeCtrl', function($scope,$http) {
    $scope.prod_type = [];    
    $http.get('/admin/list_prod_type').then(function(res) {
        console.log(res.data)
       for(var i=0; i< res.data.length; i++) {
           $scope.prod_type.push(res.data[i]);
           $scope.prod_type[i].product_type_name = decodeURI(res.data[i].product_type_name);
           
       }
    });
});

adminApp.controller('EditProdType', function($scope,$routeParams,$http) {
    $http.get('/admin/get_prod_type/:'+$routeParams.id).then(function(res) {
        $scope.prod_type = res.data[0];
        $scope.prod_type.product_type_name = decodeURI(res.data[0].product_type_name);
        console.log($scope.prod_type)
    });
});