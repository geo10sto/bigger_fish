Meteor.loginWithFacebook(function(options, err) {
    //console.error(options, err);
});

angular.module('meteorapp', []).
    config(['$routeProvider', function($routeProvider) {
        console.error(1);
        //$locationProvider.html5Mode(true);
        $routeProvider.
            when('/', {controller: 'index'}).
            otherwise({redirectTo: '/'});
}]).
controller('index', ["$scope", "$location", "$timeout", function ($scope, $location, $timeout) {
    //$scope.Users = new Meteor.AngularCollection "players", $scope, false
    $scope.users = ["Alex Bardas", "Cristi Stoica"];
    //Meteor.users.find({});
}]);
