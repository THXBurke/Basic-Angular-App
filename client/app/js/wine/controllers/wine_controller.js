var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('WineController', ['cwResource', 'cwCountTracker', function(Resource, cwCountTracker) {
    this.wine = [];
    this.errors = [];
    this.service = cwCountTracker;
    this.serviceAddCount = cwCountTracker.addCount.bind(cwCountTracker);
    this.serviceMinusCount = cwCountTracker.minusCount.bind(cwCountTracker);
    this.count = 0;
    this.addCount = function() {
      this.count ++;
    };
    var remote = new Resource(this.wine, this.errors, baseUrl + '/api/wine', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);
    this.createWine = function() {
      remote.create(this.newWine)
        .then(() => {
          this.newWine = null;
        })
        .then(() => {
          this.serviceAddCount();
        });
    }.bind(this);
    this.updateWine = function(wine) {
      remote.update(wine)
      .then(() => {
        wine.editing = false;
      });
    };
    this.removeWine = remote.remove.bind(remote);
    this.getAll();
  }]);
};
