demoApp.controller('HomeCtrl', function ($scope, Users, Products, Orders) {

    $scope.title = 'Filter orders';

    $scope.searchFilter = {
        users: [1,2],
        products: [],
        status: []
    };

    Users.loadAll().then(function(users) {
        $scope.users = users;
    });

    Products.loadAll().then(function(products) {
        $scope.products = products;
    });

    Orders.loadAllOrderStatuses().then(function(statuses) {
        $scope.statuses = statuses;
    });

    Orders.loadAllPurchaseFilterOperators().then(function(operators) {
        $scope.sale_operators = operators;
        $scope.searchFilter.sale_operator = operators[0].value;
    });

});