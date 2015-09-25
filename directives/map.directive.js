app.directive("map", function($window) {

  var initialPos = null;
    //initial position of Map (singleton)
  function setInitialPos(pos) {
    if (!initialPos) {
      initialPos = pos;
    }
    return initialPos;
  }
  return {
    restrict: "E",
    template: '<div id="map"></div>',

    link: (scope, element, attribute) => {

      //make the map position fix
      angular.element($window).bind("scroll", function() {
        setInitialPos(element.offset().top);
        var bodyPadding = parseFloat($('body').css('padding-top'));
        var distance = this.pageYOffset - bodyPadding;
        if (scope.debuggin) console.log(initialPos, distance);
        if (!!bodyPadding) {
          element.children().css('top', Math.max(distance, distance - initialPos));
        } else {
          element.children().css('top', 0);
        }
      });

      //reset map to initial position
      scope.$on("searchTrigger", function() {
        console.log(initialPos);
        console.log(element.children());
      });
    }
  };
});