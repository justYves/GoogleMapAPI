app.controller("HomeController", function($scope, $q,$rootScope,$anchorScroll) {

  //set this to true to show the app in debugging mode
  $scope.debugging = $rootScope.debugging;
  var infoWindow; //controller scoped variable


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
    $scope.bounds = null;
    infoWindow = new google.maps.InfoWindow();
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

 $scope.triggerClick= (i) => {
    // if($scope.debugging)
    //   // console.log($scope.markers[index]);
      google.maps.event.trigger($scope.markers[i], 'click');
    // $scope.markers.forEach((marker) => {
    //   marker.setIcon(defaultIcon);
    // });

    // $scope.map.setZoom(8);
    // $scope.map.setCenter($scope.markers[index].getPosition());
    // $scope.markers[index].setIcon('https://www.google.com/mapfiles/marker_green.png');
 }

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

//orange icon for google map
var defaultIcon = new google.maps.MarkerImage(
    "assets/images/pin.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(30, 30)
);

var activeIcon = new google.maps.Marker


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
        title: place.name,
        index : i+1,
        html: '<h6>' + (i+1)+ ". " +  place.name + '</h6>',
        position: place.geometry.location,
      });
      marker.setIcon(defaultIcon);



      // marker.content = '<div class="infoWindowContent">' + place.desc + '</div>';
      marker.addListener('click', (function(){
        infoWindow.setContent(this.html);
        infoWindow.open($scope.map, this);
        $scope.map.setZoom($scope.zoom + 2);
        console.log($scope.map);
        $scope.map.setCenter(this.getPosition());
      }).bind(marker));

      google.maps.event.addListener(marker, 'mouseover', function() {
        infoWindow.setContent(this.html);
        infoWindow.open($scope.map, this);
      });


      $scope.markers.push(marker);
      bounds.extend(place.geometry.location);
    }
    $scope.map.fitBounds(bounds);
    $scope.bounds = bounds;
    $scope.zoom = $scope.map.zoom;
  }
});