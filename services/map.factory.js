app.factory('Map', function($q) {

  var options = {
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false,
  };

  var create = () => {
    return new google.maps.Map(document.getElementById('map'), options)
  };

  var service = (map) => {
    return new google.maps.places.PlacesService(map);
  };

  //orange Icon
  var defaultIcon = new google.maps.MarkerImage(
    "assets/images/pin.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(30, 30)
  );

  //green Icon
  var activeIcon = 'https://www.google.com/mapfiles/marker_green.png';

  var resetMarkers = (markers) => {
    markers.forEach((marker) => {
      marker.setIcon(defaultIcon);
    });
  };

  return {
    options: options,
    new: create,
    service: service,
    defaultIcon : defaultIcon,
    activeIcon: activeIcon,
    resetMarkers: resetMarkers
  };

});