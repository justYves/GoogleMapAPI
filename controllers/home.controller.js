app.controller("HomeController", function($scope, $q, $rootScope, $anchorScroll, Map) {

  //set this to true to show the app in debugging mode
  $scope.debugging = $rootScope.debugging;
  //controller scoped variable
  var infoWindow;

  //triggered when user click search.
  $scope.search = function(query) {
    //replace zenefits with it's address so that queries allow for "Restaurant near zenefits"
    if (query.length > 1) query = query.replace(/zenefits/gi, "303 2nd St, San Francisco, CA");
    initVar();
    initMap();
    processQuery(query);
        $anchorScroll(0);
  };

  //reinitialize the variables and reset the page position after each search
  function initVar() {
    // $anchorScroll(0);
    $scope.searched = false;
    $scope.places = null;
    $scope.searched = true;
    $scope.markers = [];
    $scope.error = null;
    $scope.bounds = null;
    infoWindow = new google.maps.InfoWindow();
  }

  //create new map
  function initMap() {
    $scope.map = Map.new();
  }

  //process the query from the search box
  function processQuery(query) {
    var service = Map.service($scope.map);
    service.textSearch({
      query: query
    }, displayResult);
  }

  //Display the result
  function displayResult(data, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      if ($scope.debugging) console.error(status); //For debugging only
      $scope.error = "Sorry, we can't find what you are looking for. Try searching for something else."
      $scope.$digest();
      return;
    }
    $scope.places = trimProp(data);
    if ($scope.debugging) console.log(data); //For debugging only
    createMarkers(data);
    $scope.$digest();
  }

  //Helper Function to return only the needed properties
  var trimProp = (results) => {
    return results.map(result => {
      return {
        name: result.name,
        icon: result.icon,
        details: {
          address: result.formatted_address,
          price: Array(result["price_level"]).join("$") || null,
          rating: (result.rating) ? Array(Math.round(result.rating) + 1).join("★") + Array(Number(6 - Math.round(result.rating))).join("☆") + " (" + result.rating + ")" : null,
          types: result.types.map(type => properFormat(type).replace(/_/gi, " ")).join(", ")
        }
      };
    });
  };

  $scope.properFormat = (key) => (key.charAt(0).toUpperCase() + key.substring(1));
  var properFormat = $scope.properFormat;

  var activeIcon = new google.maps.Marker

  $scope.triggerClick = (i) => {
    // if($scope.debugging)
    //   // console.log($scope.markers[index]);


    google.maps.event.trigger($scope.markers[i], 'click');
  }


  //Create Markers on google map
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
        index: i + 1,
        html: '<h6>' + (i + 1) + ". " + place.name + '</h6>',
        position: place.geometry.location,
      });
      marker.setIcon(Map.defaultIcon);



      //Add event listener
      marker.addListener('click', (function() {
        Map.resetMarkers($scope.markers);
        this.setIcon(Map.activeIcon);
        infoWindow.setContent(this.html);
        infoWindow.open($scope.map, this);
        $scope.map.setZoom(Math.min($scope.zoom + 2, 13));
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