const express = require('express');

const authModel = require('models/auth');

// const config = require('config');

const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
  clientID: '444253988892-iur0hcui5nu8sprl3avjhhput23fu2e0.apps.googleusercontent.com',
  clientSecret: 'C7MCMb3ERAosJ8lmm0-rpBpj',
  callbackURL: 'auth/gl/callback',
  profileFields: [
    'id',
    'name',
    'link',
    'picture',
    'gender',
    'locale',
  ],
},
((accessToken, refreshToken, profile, done) => {
  profile.username = profile.displayName;
  profile.token = accessToken;

  authModel.findOrCreate(profile, accessToken, (err, user) => {
    if (err) { return done(err, null); }
    return done(null, user);
  });
})));


router.get('/',
  passport.authenticate('google', {
    scope: ['email'],
  }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
