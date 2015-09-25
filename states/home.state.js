app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pre-build/views/home.html',
        controller: 'HomeController'
        //Geolocation (later implementation?)
        // resolve: {
        //   location: function(LocationFactory){
        //     return LocationFactory.getLocation();
        //   }
        // }
    });
});