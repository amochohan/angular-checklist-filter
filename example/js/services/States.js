demoApp.factory('States', function($http) {
    return {
        loadAll: function(country) {
            //return the promise directly.
            return $http.get('data/states/' + country + '.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});