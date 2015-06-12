demoApp.factory('Users', function($http) {
    return {
        loadAll: function() {
            //return the promise directly.
            return $http.get('data/users.json')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});