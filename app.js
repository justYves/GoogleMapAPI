var app = angular.module('ZenefitsApp',['ui.bootstrap','ui.router'])

.run(function($rootScope) {
    $rootScope.debugging = true;
})

.config(function ($urlRouterProvider, $locationProvider) {
   $locationProvider.html5Mode(true);

   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});
