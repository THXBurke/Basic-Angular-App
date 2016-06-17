module.exports = function(app) {
  app.factory('cwResource', ['$http', 'cwHandleError', 'cwCountTracker', function($http, cwError, cwCountTracker) {
    var Resource = function(resourceArr, errorsArr, baseUrl, options) {
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
      this.serviceMinusCount = cwCountTracker.minusCount.bind(cwCountTracker);
      this.options = options || {};
      this.options.errMessages = this.options.errMessages || {};
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++)
            this.data.push(res.data[i]);
        }, cwError(this.errors, this.options.errMessages.getAll || 'could not fetch resource'));

    };

    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);

        }, cwError(this.errors, this.options.errMessages.create || 'could not save resource'));
    };

    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
      .catch( cwError(this.errors, this.options.errMessages.update || 'could not update resource'));
    };

    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
      .then(() => {
        this.serviceMinusCount();
      })
    .then(() => {
      this.data.splice(this.data.indexOf(resource), 1);
    }, cwError(this.errors, this.options.errMessages.remove || 'could not remove resource'));
    };
    return Resource;
  }]);
};
