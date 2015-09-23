app.controller("HomeController", function($scope) {
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
  //
  console.log($scope.location);

  // var myLatlng = new google.maps.LatLng(-34.397, 150.644);
  // var mapOptions = {
  //   zoom: 8,
  //   center: myLatlng,
  //   mapTypeId: google.maps.MapTypeId.SATELLITE
  // };
  // var map = new google.maps.Map(document.getElementById("map"),
  //     mapOptions);
  //
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(40.0000, -98.0000),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
  var service = new google.maps.places.PlacesService($scope.map);
  var request = {
    location: pyrmont,
    radius: '500',
    types: ['store']
  };
  service.nearbySearch(request, function(data) {
    console.log(data);
  });

  console.log($scope.map);
  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function(info) {

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    });

    $scope.markers.push(marker);

  };

  // for (i = 0; i < cities.length; i++){
  //     createMarker(cities[i]);
  // }

  // $scope.openInfoWindow = function(e, selectedMarker){
  //     e.preventDefault();
  //     google.maps.event.trigger(selectedMarker, 'click');
  // }


});