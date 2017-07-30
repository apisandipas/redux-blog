const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  email: { 
    type: String, 
    unique: true, 
    lowercase: true 
  },
  password: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]
})

// On Save Hook, encrypt password
// Before saving a mode, run this function
UserSchema.pre('save', function (next) {
  // get access to user model
  const user = this
  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }
    // hash password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err) }
      // our encrypted password
      user.password = hash
      next()// go ahead and save
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

module.exports = mongoose.model('user', UserSchema)
