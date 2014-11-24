var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var usersDal = require('../../dal/usersDal');

exports.setup = function (config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      usersDal.getUserByEmailInternal(email.toLowerCase(), function(user) {
        //if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!usersDal.authenticate(password, user)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};