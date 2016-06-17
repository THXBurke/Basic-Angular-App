var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('CheeseController', ['cwResource', 'cwCountTracker', function(Resource, cwCountTracker) {
    this.cheese = [];
    this.errors = [];
    this.service = cwCountTracker;
    this.serviceAddCount = cwCountTracker.addCount.bind(cwCountTracker);
    this.serviceMinusCount = cwCountTracker.minusCount.bind(cwCountTracker);
    this.count = 0;
    var remote = new Resource(this.cheese, this.errors, baseUrl + '/api/cheese', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);
    this.createCheese = function() {
      remote.create(this.newCheese)
        .then(() => {
          this.newCheese = null;
        })
        .then(() => {
          this.serviceAddCount();
        });
    }.bind(this);
    this.updateCheese = function(cheese) {
      remote.update(cheese)
      .then(() => {
        cheese.editing = false;
      });
    };
    this.removeCheese = remote.remove.bind(remote);
    this.getAll();
  }]);
};
