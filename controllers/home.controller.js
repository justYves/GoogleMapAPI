app.controller("HomeController", function($scope,$q) {

  //set this to true to show the app in debugging mode
  $scope.debugging = false;

  function initMap(){

  }

  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(37.761824,-122.398587),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl : false,
    // draggable: false
  };

              var map = new google.maps.Map(document.getElementById('map'), mapOptions);
              $scope.map = map;
              $scope.markers = [];
              var infoWindow = new google.maps.InfoWindow();



  var zenefits = new google.maps.LatLng(37.761824,-122.398587);
  var service = new google.maps.places.PlacesService($scope.map);


$scope.search = function(query){
  $scope.searched = true;
    service.textSearch({query:query}, function(data) {
    $scope.places = data;
    console.log(data);
    createMarkers(data);
    $scope.$digest();
  });

};


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

              //     google.maps.event.addListener(marker, 'click', function(){
              //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
              //         infoWindow.open($scope.map, marker);
              //     });
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
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });


    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

              // for (var i = 0; i < cities.length; i++){
              //     createMarker(cities[i]);
              // }

              // $scope.openInfoWindow = function(e, selectedMarker){
              //     e.preventDefault();
              //     google.maps.event.trigger(selectedMarker, 'click');
              // }
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

  // $scope.openInfoWindow = function(e, selectedMarker){
  //     e.preventDefault();
  //     google.maps.event.trigger(selectedMarker, 'click');
  // }


});