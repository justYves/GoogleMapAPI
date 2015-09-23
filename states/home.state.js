app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pre-build/views/home.html',
        controller: 'HomeController'
        // resolve: {
        //   location: function(LocationFactory){
        //     return LocationFactory.getLocation();
        //   }
        // }
    });
});