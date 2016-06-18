const Router = require('express').Router;
const Cheese = require(__dirname + '/../models/cheese');
const jsonParser = require('body-parser').json();
const eH = require(__dirname + '/../lib/error_handler.js');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var cheeseRouter = module.exports = Router();


cheeseRouter.post('/cheese', jwtAuth, jsonParser, (req, res) => {
  var newCheese = new Cheese(req.body);
  newCheese.collectorId = req.user._id;
  newCheese.save((err, data) => {
    if (err) return eH(err, res);
    res.status(200).json(data);
  });
});

cheeseRouter.get('/cheese', jwtAuth, (req, res) => {
  // console.log(collectorId);

  Cheese.find({ collectorId: req.user._id }, (err, data) => {
    if (err) return eH(err, res);
    if (err)console.log(err);

    res.status(200).json(data);
  });
});


cheeseRouter.put('/cheese/:id', jwtAuth, jsonParser, (req, res) => {
  var cheeseData = req.body;
  delete cheeseData._id;
  Cheese.update({ _id: req.params.id }, cheeseData, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Cheese updated' });
  });
});

cheeseRouter.delete('/cheese/:id', (req, res) => {
  Cheese.remove({ _id: req.params.id }, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Cheese eaten' });
  });
});
