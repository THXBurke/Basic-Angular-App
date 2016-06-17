module.exports = function(app) {
  app.factory('cwCountTracker', [function() {
    return {
      count: 0,
      addCount: function() {
        this.count++;
      },
      minusCount: function() {
        this.count--;
      }
    };
  }]);

};
