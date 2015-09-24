app.directive("searchBox", function($window) {

    var adjustBodyOffset = (padding) => {
        $('body').css('padding-top', padding + 'px');
    };

    return {
        restrict: "E",
        templateUrl: "/pre-build/views/search-box.html",
        link: (scope, element, attribute) => {
            angular.element($window).bind("scroll", function() {
              // <---- debugger
                if (scope.debugging) console.log(this.pageYOffset);

                if ((this.pageYOffset > $("#headline").outerHeight(true))) {
                    // <---- debugger
                    if (scope.debugging)  console.log("ran added padding");// debugger ---->

                    element.addClass('navbar-fixed-top');
                    adjustBodyOffset(element.outerHeight(true));
                } else if (this.pageYOffset - element.outerHeight(true) < $("#headline").outerHeight(true)) {
                  // <---- debugger
                    if (scope.debugging) console.log("ran", this.pageYOffset, "limit", $("#headline").outerHeight(true)); // debugger ---->

                    element.removeClass('navbar-fixed-top');
                    adjustBodyOffset(0);
                }
            });
        }
    };
});
