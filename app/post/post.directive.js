angular.module("app").directive('ngCodemirror', function() {
  return {
    restrict: 'C',
    link: function(scope, elm, attrs) {}
  };
});

angular.module("app").directive('compile', [
  '$compile', function($compile) {
    return function(scope, element, attrs) {
      scope.$watch((function(scope) {
        return scope.$eval(attrs.compile);
      }), function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      });
    };
  }
]);
