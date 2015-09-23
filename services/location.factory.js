app.factory('Geolocation', function($q) {


  var currentLocation;

  function getLocation() {
    var deferred = $q.defer();

    $window.navigator.geolocation.getCurrentPosition(function(position) {
      deferred.resolve(position);
    });

    return deferred.promise;
  }

  // function searchLocation() {
  //   if (navigator.geolocation) {
  //     return navigator.geolocation.getCurrentPosition(setLocation);
  //   } else {
  //     return "Geolocation is not supported by this browser.";
  //   }
  // }

  // function setLocation(location) {
  //   console.log(location);
  //   return currentLocation = location;
  // }

  // function getCurrent() {
  //   return currentLocation;
  // }



  return {
    getLocation: getLocation
    // getCurrent: getCurrent
  };

});