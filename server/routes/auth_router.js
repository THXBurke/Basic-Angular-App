// const express = require('express');
const Router = require('express').Router;
const User = require(__dirname + '/../models/users');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var authRouter = new Router();

authRouter.post('/signup', jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'password is blank' });
  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'can\'t create user' });
    var token = user.generateToken();
    if (err) return res.status(500).json({ msg: 'can\'t generate token' });
    res.json({ token });
  });
});


authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'server has an error' });
    if (!user) return res.status(500).json({ msg: 'not a user' });
    if (!user.compareHash(req.auth.password)) return res.status(500).json({ msg: 'auth failed' });

    var token = user.generateToken();
    if (err) return res.status(500).json({ msg: 'can\'t generate token' });
    res.json({ token });
  });
});

authRouter.get('/profile', jwtAuth, (req, res) => {
  res.send({ username: req.user.username });
});

module.exports = exports = authRouter;
