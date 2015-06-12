var demoApp = angular.module('demoApp', ['drawmyattention.filters']);

angular.module('drawmyattention.filters', []).filter('checklist', function() {
    return function(data, lookup_array, lookup_field, lookup_output, default_no_results)
    {
        var output = '';
        var i = 0, l = 0;
        if(data && lookup_array)
        {
            for (i = 0; i < data.length; i++)
            {
                for(l=0; l<lookup_array.length; l++)
                {
                    if(lookup_array[l][lookup_field] == data[i])
                    {
                        output += lookup_array[l][lookup_output] + ', ';
                    }
                }
            }
        }

        if(output.length==0)
        {
            return 'any ' + default_no_results;
        }
        return output.substring(0, output.length - 2);
    }
}).directive('checklist', function() {

    return {
        restrict: "E",
        templateUrl: 'https://raw.githubusercontent.com/drawmyattention/angular-checklist-filter/master/src/templates/checklistTpl.html',
        scope: {
            id : "@name",
            menu : "@shows",
            data : "=data",
            source : "=source",
            sourcekey : "@sourcekey",
            sourcevalue : "@sourcevalue",
            model : "@model"
        },
        link: function($scope, element, attrs) {

            $scope.toggleChecklist = function()
            {
                $scope.menu = !$scope.menu;
            }

            $scope.clearFilter = function(model) {
                $scope.data = [];
            }

            $scope.toggleUser = function toggleUser(id) {
                var idx = $scope.data.indexOf(id);
                if (idx > -1) {
                    $scope.data.splice(idx, 1);
                } else {
                    $scope.data.push(id);
                }
            };
        }
    };
});

demoApp.factory('Orders', function($http) {
    return {
        loadAllOrderStatuses: function() {
            //return the promise directly.
            return $http.get('https://raw.githubusercontent.com/drawmyattention/angular-checklist-filter/master/example/data/order_status.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        },
        loadAllPurchaseFilterOperators: function() {
            //return the promise directly.
            return $http.get('https://raw.githubusercontent.com/drawmyattention/angular-checklist-filter/master/example/data/sale_operators.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});

demoApp.factory('Products', function($http) {
    return {
        loadAll: function() {
            //return the promise directly.
            return $http.get('https://raw.githubusercontent.com/drawmyattention/angular-checklist-filter/master/example/data/products.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});

demoApp.factory('Users', function($http) {
    return {
        loadAll: function() {
            //return the promise directly.
            return $http.get('https://raw.githubusercontent.com/drawmyattention/angular-checklist-filter/master/example/data/users.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});

demoApp.controller('HomeCtrl', function ($scope, Users, Products, Orders) {

    $scope.demoTitle = 'Angular Checklist Filter';

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