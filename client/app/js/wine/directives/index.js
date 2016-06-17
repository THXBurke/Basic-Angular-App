module.exports = function(app) {
  require('./wine_list_item.js')(app);
  require('./wine_form.js')(app);
};
