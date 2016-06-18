const Router = require('express').Router;
const Wine = require(__dirname + '/../models/wine');
const jsonParser = require('body-parser').json();
const eH = require(__dirname + '/../lib/error_handler.js');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var wineRouter = module.exports = Router();

wineRouter.post('/wine', jwtAuth, jsonParser, (req, res) => {
  var newWine = new Wine(req.body);
  newWine.collectorId = req.user._id;
  newWine.save((err, data) => {
    if (err) return eH(err, res);
    res.status(200).json(data);
  });
});

wineRouter.get('/wine', jwtAuth, (req, res) => {
  Wine.find({ collectorId: req.user._id }, (err, data) => {
    if (err) return eH(err, res);
    res.status(200).json(data);
  });
});


wineRouter.put('/wine/:id', jwtAuth, jsonParser, (req, res) => {
  var wineData = req.body;
  delete wineData._id;
  Wine.update({ _id: req.params.id }, wineData, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Wine updated' });
  });
});

wineRouter.delete('/wine/:id', (req, res) => {
  Wine.remove({ _id: req.params.id }, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Wine drank up' });
  });
});

module.exports = exports = wineRouter;
