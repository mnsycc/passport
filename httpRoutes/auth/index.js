const express = require('express');

const router = express.Router();

// const userModel = require('models/user');
// const passport = require('passport');

// strategie`s list
const gl = require('./gl');


// passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());

// routes
router.use('/gl', gl);

router.get('/login', (req, res, next) => {
  res.render('auth');
});


module.exports = router;
