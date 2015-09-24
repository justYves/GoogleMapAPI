app.controller("HomeController", function($scope, $q,$rootScope,$anchorScroll) {

  //set this to true to show the app in debugging mode
  $scope.debugging = $rootScope.debugging;

  $scope.search = function(query) {
    //Hard coded Zenefits' address
    // var zenefits = new google.maps.LatLng(37.761824, -122.398587);
    $anchorScroll(0);
    if (query.length > 1) query = query.replace(/zenefits/gi, "303 2nd St, San Francisco, CA");
    initVar();
    initMap();
    processQuery(query);
  };

  function initMap() {
    var mapOptions = {
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function initVar() {
    $scope.searched = false;
    $scope.places = null;
    $scope.searched = true;
    $scope.markers = [];
    $scope.error = null;
    // var infoWindow = new google.maps.InfoWindow();
  }

  function processQuery(query) {
    var service = new google.maps.places.PlacesService($scope.map);
    service.textSearch({
      query: query
    }, displayResult)
  }

  function displayResult(data,status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    $scope.error="Sorry, we can't find what you are looking for. Try searching for something else."
    $scope.$digest();
    return;
  }
    $scope.places = trimProp(data);
    if ($scope.debugging) console.log(data);
    createMarkers(data);
    $scope.$digest();
  };


  //Function to return only the needed properties
  var trimProp = (results) => {
    return results.map(result => {
      return {
        name: result.name,
        icon: result.icon,
        details: {
          address: result.formatted_address,
          types: result.types.map(type => type.replace(/_/gi, " ")).join(", "),
          price: result["price_level"] || null,
          rating: result.rating || null
        }
      };
    });
  };

  $scope.formatKey = (key) => (key.charAt(0).toUpperCase() + key.substring(1));






  // var request = {
  //   location: zenefits,
  //   radius: '500',
  //   types: ['store']
  // };

  // service.nearbySearch(request, function(data) {
  //   $scope.places = data;
  //   console.log(data);
  //   createMarkers(data);
  // });
  // var createMarker = function (info){
  //     var marker = new google.maps.Marker({
  //         map: $scope.map,
  //         position: new google.maps.LatLng(info.lat, info.long),
  //         title: info.city
  //     });
  //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';


  //     $scope.markers.push(marker);
  // }

  function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: $scope.map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });


      marker.content = '<div class="infoWindowContent">' + place.desc + '</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open(map, marker);
      });

      bounds.extend(place.geometry.location);
    }
    $scope.map.fitBounds(bounds);
  }


  // service = new google.maps.places.PlacesService();
  // $scope.query ="";

  // LocationFactory.searchLocation();
  // .then(function(location) {
  // $scope.location = location.coords.accuracy;
  // console.log(location.coords);

  // })
  // .then(null,function(err){
  //   console.log(err);
  // });

  // $scope.search = function(query) {
  //   alert(query);
  //   $scope.location = {
  //     latitude: LocationFactory.getCurrent().coords.latitude,
  //     longitude: LocationFactory.getCurrent().coords.longitude
  //   };
  //   console.log($scope.location);
  // };
  // //
  // console.log($scope.location);



  // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);



  // console.log($scope.map);
  // $scope.markers = [];

  // var infoWindow = new google.maps.InfoWindow();

  // var createMarker = function(info) {

  //   var marker = new google.maps.Marker({
  //     map: $scope.map,
  //     position: new google.maps.LatLng(info.lat, info.long),
  //     title: info.city
  //   });
  //   marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

  //   google.maps.event.addListener(marker, 'click', function() {
  //     infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
  //     infoWindow.open($scope.map, marker);
  //   });

  //   $scope.markers.push(marker);

  // };

  // for (i = 0; i < cities.length; i++){
  //     createMarker(cities[i]);
  // }



});