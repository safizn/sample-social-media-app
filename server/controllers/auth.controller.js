import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../config/config.js'
import User from '../models/user.model.js'

export const signin = async (req, res) => {
  await User.findOne({ "email": req.body.email })
    .then(user => {
      if(!user) throw new Error('User not found')
      if(!user.authenticate(req.body.password)) return res.status('401').send({ error: 'Email & password don\'t match.' })
      const token = jwt.sign({ _id: user._id }, config.jwtSecret)
      res.cookie('t', token, { expire: new Date() + 9999 /*ms*/ }) // in case cookies are used
      return res.json({
        token, 
        user: { _id: user._id, name: user.name, email: user.email }
      })
    })
    .catch(err => res.status('401').json({ error: 'User not found' }))
}

export const signout = (req, res) => { 
  res.clearCookie('t')
  return res.status('200').json({ message: 'signed out' })
}

export const requireSignin = expressJwt({ secret: config.jwtSecret, userProperty: 'auth' })

export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if(!authorized) return res.status('401').json({ error: 'User is not authorized' })

  next()
}