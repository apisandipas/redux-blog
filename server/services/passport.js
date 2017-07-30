const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

// create Local Strategy
const localOptions = { usernameField: 'email' }

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  //  Verify Username and Password
  User.findOne({ email }, function (err, user) {
    if (err) { return done(err, false) }
    if (!user) { return done(null, false) }

    // compare passwords
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database,
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false) }

    if (user) {
      // If it does, call 'done' with that user
      done(null, user)
    } else {
        // Otherwise, call 'done' without a user object
      done(null, false)
    }
  })
})

// Tell Passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)