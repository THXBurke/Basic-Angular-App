module.exports = function(app) {
  require('./cw_handle_error')(app);
  require('./cw_resource')(app);
  require('./cw_count_tracker')(app);
};
