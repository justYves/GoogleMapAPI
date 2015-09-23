app.config(function($stateProvider) {
    $stateProvider.state('result', {
        url: '/result',
        templateUrl: '/app/js/views/home.html',
        controller: 'HomeController'
    });
});