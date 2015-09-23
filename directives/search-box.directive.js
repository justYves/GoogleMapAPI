app.directive("searchBox", function($window){
  return {
    restrict: "E",
    templateUrl: "/pre-build/views/search-box.html",
    link: (scope,element,attribute) => {
        angular.element($window).bind("scroll", function() {
          console.log(this.pageYOffset);
             if (this.pageYOffset >= $("h1").outerHeight(true)) {
                  element.addClass('navbar-fixed-top');
             } else {
                  element.removeClass('navbar-fixed-top');
             }
        });
    }
  };
});

