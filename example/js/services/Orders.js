demoApp.factory('Orders', function($http) {
    return {
        loadAllOrderStatuses: function() {
            //return the promise directly.
            return $http.get('data/order_status.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        },
        loadAllPurchaseFilterOperators: function() {
            //return the promise directly.
            return $http.get('data/sale_operators.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});