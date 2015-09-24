app.directive("searchBox", function($window){

  var  adjustBodyOffset = (padding) => {
    $('body').css('padding-top', padding + 'px' );
  };

  return {
    restrict: "E",
    templateUrl: "/pre-build/views/search-box.html",
    link: (scope,element,attribute) => {
        angular.element($window).bind("scroll", function() {
          if(scope.debugging) console.log(element[0].offsetHeight);
             if (this.pageYOffset >= $("#headline").outerHeight(true)) {
                  element.addClass('navbar-fixed-top');
                  adjustBodyOffset(element.outerHeight(true));
             } else if(this.pageYOffset >= $("#headline").outerHeight(true)<= $("#headline").outerHeight(true) - element.outerHeight(true)) {
                  element.removeClass('navbar-fixed-top');
                  // adjustBodyOffset(element.outerHeight(0));
             }
        });
    }
  };
});

