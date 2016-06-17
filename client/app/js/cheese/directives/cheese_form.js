module.exports = function(app) {
  app.directive('cheeseForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/cheese/directives/cheese_form.html',
      scope: {
        cheese: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateCheese,
          create: controller.createCheese
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
