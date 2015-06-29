demoApp.factory('Countries', function($http) {
    return {
        loadAll: function() {
            //return the promise directly.
            return $http.get('data/countries.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});