const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'GET /api/users'
  });
});
/* POST new user. */
router.post('/register', async (req, res, next) => {
  const existingUser = await User.findOne({
    $or: [{username: req.body.username}, {email: req.body.email}]
  });

  if (existingUser) {
    const err = new Error('Validation Error');
    err.statusCode = 400;
    const errors = {};
    if (existingUser.username === req.body.username) {
      errors.username = 'Username already taken'
    }
    if (existingUser.email === req.body.email) {
      errors.email = 'A user has already registered with this email';
    }
    err.errors = errors;
    return next(err);
  } else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email
    })
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json( { user} );
        }
        catch(err) {
          next(err);
        }
      });
    });
  }
});

module.exports = router;
