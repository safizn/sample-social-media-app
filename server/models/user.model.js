import crypto from 'crypto'
import mongoose from 'mongoose'
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = new mongoose.Schema({ 
  name: {
    type: String, 
    trim: true, // side white-space removal
    required: 'Name is required'
  }, 
  email: {
    type: String,
    trim: true, 
    unique: 'Email already exists',
    required: 'Email is required',
    match: [emailRegex, 'Please fill a valid email address'],
  }, 
  created: {
    type: Date,
    default: Date.now
  }, 
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required"
  }, 
  salt: String
})

// Password is a virtual field which is not stored directly. (Getter & Setter field)
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// Password field validation
UserSchema.path('hashed_password').validate(function(value) {
  if(this._password && this._password.length < 6) 
    this.invalidate('password', 'Password must be at least 6 characters.')
  if(this.isNew && !this._password)
    this.invalidate('password', 'Password is required')
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      console.log(erro)
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)