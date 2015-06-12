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
        template: '<span class="toggleChecklist" ng-click="toggleChecklist()">{{ data | checklist: source:sourcekey:sourcevalue:model }}<span class="checklist" ng-show="menu"><label class="form-control"><input type="checkbox" name="selected{{model}}[]" value="" ng-checked="data.length == 0" ng-click="clearFilter(model)"> any</label><label ng-repeat="item in source" class="form-control"> <input type="checkbox" name="selected{{model}}[]" value="{{ item[sourcekey] }}" ng-checked="data.indexOf(item[sourcekey] ) > -1" ng-click="toggleUser(item[sourcekey])"> {{ item[sourcevalue] }} </label> </span></span>',
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


demoApp.controller('HomeCtrl', function ($scope) {

    $scope.demoTitle = 'Angular Checklist Filter';

    $scope.searchFilter = {
        users: [1,2],
        products: [],
        status: []
    };

    $scope.users = [
        {
            "id":1,
            "name":"Amo"
        },
        {
            "id":2,
            "name":"Ben"
        },
        {
            "id":3,
            "name":"Joe"
        },
        {
            "id":4,
            "name":"Fred"
        },
        {
            "id":5,
            "name":"Mari"
        },
        {
            "id":6,
            "name":"Ben"
        }
    ];

    $scope.products = [
        {
            "id": 1,
            "code": "ts01",
            "name": "Blue T-Shirt"
        },
        {
            "id": 2,
            "code": "ts02",
            "name": "Green T-Shirt"
        },
        {
            "id": 3,
            "code": "ts03",
            "name": "Striped T-Shirt"
        },
        {
            "id": 4,
            "code": "jk01",
            "name": "Retro Leather Jacket"
        },
        {
            "id": 5,
            "code": "jk02",
            "name": "Denim Jacket"
        },
        {
            "id": 6,
            "code": "tb01",
            "name": "Smart Black Trousers"
        },
        {
            "id": 7,
            "code": "tb02",
            "name": "Smart Grey Trousers"
        }
    ];

    $scope.statuses = [
        {
            "id":1,
            "name":"Draft"
        },
        {
            "id":2,
            "name":"Paid"
        },
        {
            "id":3,
            "name":"Cancelled"
        },
        {
            "id":4,
            "name":"Returned"
        },
        {
            "id":5,
            "name":"Awaiting payment"
        }
    ];



});