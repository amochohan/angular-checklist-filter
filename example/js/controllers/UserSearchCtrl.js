demoApp.controller('UserSearchCtrl', function ($scope, Countries, States, Users) {

    $scope.title = 'Filter users';

    Users.loadAll().then(function(users) {
        $scope.managers = users;
        console.log($scope.managers);
    });

    $scope.product_modifiers = [
        {
            value: "all",
            label: "to each of"
        },
        {
            value: "any",
            label: "at least one of"
        },
        {
            value: "none",
            label: "anything except"
        }
    ];

    $scope.date_modifiers = [
        {
            value: "<=",
            label: "before or on"
        },
        {
            value: "<",
            label: "before"
        },
        {
            value: "=",
            label: "on"
        },
        {
            value: ">=",
            label: "after or on"
        }
    ];



    $scope.searchFilter = {
        country: '',
        state: '',
        city: '',
        licence_statuses: [],
        licence_types: [],
        product_modifier: $scope.product_modifiers[0].value,
        products: [],
        date_modifier: $scope.date_modifiers[0].value,
        licence_date: '2015-06-19',
        managers: []
    };

    $scope.cities = [
        {
            name: "Nottingham"
        },
        {
            name: "London"
        }
    ];

    $scope.licence_statuses = [
        {
            value: "active",
            label: "Active"
        },
        {
            value: "expired",
            label: "Expired"
        }
    ];

    $scope.licence_types = [
        {
            value: "premium",
            label: "Premium"
        },
        {
            value: "standard",
            label: "Standard"
        },
        {
            value: "trial",
            label: "Trial"
        },
        {
            value: "press",
            label: "Press"
        },
        {
            value: "comp",
            label: "Complimentary"
        },
        {
            value: "corp",
            label: "Corporate"
        }
    ];



    $scope.products = [
        {
            cat_id: 1,
            cat_name: "Netflix"
        },
        {
            cat_id: 2,
            cat_name: "Amazon Prime"
        },
        {
            cat_id: 3,
            cat_name: "Hulu"
        },
        {
            cat_id: 4,
            cat_name: "Now TV"
        }
    ];

    Countries.loadAll().then(function(countries) {
        $scope.countries = countries;
    });

    $scope.loadDependency = function(dependency, param, service_provider)
    {
        service_provider = eval(service_provider);
        service_provider.loadAll(param).then(function(data) {
            $scope[dependency] = data;
        });
    }

});