// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);
scotchApp.run(function($rootScope) {
    $rootScope.$on('scope.stored', function(event, data) {
        console.log("scope.stored", data); //for testing purposes
    });
});
// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page  
        .when('/', {
            templateUrl: 'home.html',
            controller: 'mainController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'mainController'
        })

    // route for the contact page
    .when('/contact', {
        templateUrl: 'contact.html',
        controller: 'contactController'
    });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $http, Scopes) {
    Scopes.store('mainController', $scope);
    $scope.getMemberId = function(memberId) {
        $scope.memberId = memberId;
        //console.log(memberId);
    }

    $http.get('details.json').success(function(data) {
        $scope.records = data.records;
        //console.log(data.records);
    });

});



scotchApp.controller('contactController', function($scope, $http, Scopes) {
    Scopes.store('contactController', $scope);
    $scope.getMemberId = function(nameId) {
        $scope.nameId = nameId;
        $scope.updatedList = Scopes.get('contactController').nameId;
    }
    $http.get('details.json').success(function(data) {
        $scope.records = data.records;
        //console.log(data.records);
    });

    $scope.listId = Scopes.get('mainController').memberId;
    //console.log($scope.listId + 'test');



});

scotchApp.controller('aboutController', function($scope) {

});

scotchApp.factory('Scopes', function($rootScope) {
    var mem = {};

    return {
        store: function(key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function(key) {
            return mem[key];
        }
    };
});