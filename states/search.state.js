app.config(function($stateProvider) {
    $stateProvider.state('search', {
        url: '/search',
        templateUrl: '/app/js/views/home.html',
        controller: 'HomeController'
    });
});