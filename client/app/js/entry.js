const angular = require('angular');
const cwApp = angular.module('cwApp', [require('angular-route')]);
require('./services')(cwApp);
require('./cheese')(cwApp);
require('./wine')(cwApp);
require('./auth')(cwApp);

cwApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/cheese', {
      templateUrl: 'templates/cheese/views/cheese_view.html'
    //   controller: 'CheeseController',
    //   controllerAs: 'cheesectrl'
    })
    .when('/wine', {
      templateUrl: 'templates/wine/views/wine_view.html'
    })
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
