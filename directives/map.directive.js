app.directive("map", function($window) {
  var initialPos = null;
  function setInitialPos(pos){
    if(!initialPos) {
      initialPos = pos
    }
    return initialPos;
  }
  return {
    restrict: "E",
    // templateUrl: "/pre-build/views/map.html"
    template: '<div id="map"></div>',

    link: (scope, element, attribute) => {
      angular.element($window).bind("scroll", function() {
        setInitialPos(element.offset().top);
        var bodyPadding = parseFloat($('body').css('padding-top'));
        var distance = this.pageYOffset - bodyPadding;
        // var top = element.offset().top;
        console.log(initialPos,distance);
        if(!!bodyPadding) {
          element.children().css('top',Math.max(distance,distance-initialPos))
        }else {
          element.children().css('top',0);
        }
      });
    }
  };
});

        // element.css('position','');
        //   top = element.offset().top;
        //   element.css('position,absolute');
        //   element.css('top',Math.max(top,$(document).scrollTop()));