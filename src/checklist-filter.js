/**
 * @param array data            The variable that the filter is being run on.
 * @param array lookup_array    The array within which to find the data
 * @param string lookup_field   The index on the lookup_array to search
 * @param string lookup_output  The index on the lookup_array to output
 * @param string default_no_results The noun that is being searched (eg, Users, Products, Orders)
 */
angular.module('drawmyattention.filters', []).filter('checklist', function() {
    return function(data, lookup_array, lookup_field, lookup_output, default_no_results, noselection)
    {
        var output = '';

        var i = 0, l = 0;
        if(data && lookup_array)
        {
            if(data.constructor === Array)
            {
                console.log('true');
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
            else
            {
                for(i = 0; i< lookup_array.length; i++)
                {
                    if(lookup_array[i][lookup_field] == data)
                    {
                        output = lookup_array[i][lookup_output] + ', ';
                    }
                }
            }
        }

        if(output.length==0)
        {
            return noselection + ' ' + default_no_results;
        }

        return output.substring(0, output.length - 2);
    }
}).directive('checklist', function(States) {

    return {
        restrict: "E",
        templateUrl: '../src/templates/checklistTpl.html',
        scope: {
            id : "@name",
            noselection : "@noselection",
            menu : "@shows",
            data : "=data",
            source : "=source",
            sourcekey : "@sourcekey",
            sourcevalue : "@sourcevalue",
            model : "@model",
            requiresdata : "=requiresdata",
            requiresmodel : "@requiresmodel",
            verbose: "@verbose",
            loadmodelonchange: "@loadmodelonchange",
            dependencyservice: "@loadmodelonchange"
        },
        link: function($scope, element, attrs) {

            $scope.hasRequiredDependency = function()
            {
                if($scope.requiresdata===undefined) {
                    return true;
                }
                if($scope.requiresdata.constructor === Array) {
                    if($scope.requires.length>0) {
                        return true;
                    }
                } else {
                    if($scope.requiresdata != '') {
                        return true;
                    }
                }
                return false;
            }

            $scope.toggleChecklist = function()
            {
                $scope.menu = !$scope.menu;
            }

            $scope.clearFilter = function(model) {
                // Clear the contents whilst retaining the data typew
                if($scope.data.constructor === Array) {
                    $scope.data = [];
                } else {
                    $scope.data = '';
                }
            }

            $scope.toggleList = function toggleList(id) {

                /**
                 * The selected data scope can be of two types:
                 *
                 * 1) Array (for multiple option selections)
                 * 2) String (for single option selections)
                 */

                if($scope.data.constructor === Array)
                {
                    // Search through an array of data
                    var idx = $scope.data.indexOf(id);
                    if (idx > -1) {
                        $scope.data.splice(idx, 1);
                    } else {
                        $scope.data.push(id);
                        $scope.updateDependencies(id);
                    }
                }
                else
                {
                    // Compare string values
                    if($scope.data == id)
                    {
                        $scope.data = '';
                    }
                    else
                    {
                        $scope.data = id;
                        $scope.updateDependencies(id);
                    }
                }

            };

            $scope.updateDependencies = function(id)
            {
                if($scope.dependencyservice)
                {
                    $scope.$parent.loadDependency(
                        $scope.loadmodelonchange,
                        id,
                        $scope.dependencyservice.charAt(0).toUpperCase() + $scope.dependencyservice.slice(1)
                    );
                }
            }
        }
    };
});
