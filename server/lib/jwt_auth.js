const User = require(__dirname + '/../models/users');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'can\'t authenticates' });


    User.findOne({ _id: decoded.idd }, (err, data) => {
      if (err) return res.status(403).json({ msg: 'can not authenticate' });
      if (!data) return res.status(403).json({ msg: 'user not found ' });
      req.user = data;
      next();
    });
  });
};
