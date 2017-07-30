const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

function tokenForUser (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

class AuthController {

  signup (req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
     return res.status(422).send({ error: 'You must provide an email and password' })
    }

    // See if user with given email exist
    User.findOne({ email }, function (err, existingUser) {
      if (err) { return next(err) }

      // if a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' })
      }

      // if the email does NOT exist, create and save user record
      const user = new User({ email, password })
      user.save(function (err) {
       if (err) { return next(err) }

       // Respond to request indicating user was created
       res.json({ token: tokenForUser(user) })
      })
    })
  }

  signin (req, res, next) {
    // User has already had thier email and password auth'd
    // We just need to give them a token.
    res.send({
      token: tokenForUser(req.user)
    })
  }

}

module.exports = new AuthController()
