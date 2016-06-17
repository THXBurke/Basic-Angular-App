module.exports = function(app) {
  app.directive('cheeseListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/cheese/directives/cheese_list_item.html',
      scope: {
        cheese: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeCheese;
      }
    };
  });
};
