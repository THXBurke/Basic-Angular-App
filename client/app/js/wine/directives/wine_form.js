module.exports = function(app) {
  app.directive('wineForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/wine/directives/wine_form.html',
      scope: {
        wine: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateWine,
          create: controller.createWine
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
