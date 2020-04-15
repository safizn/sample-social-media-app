import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

export const create = async (req, res, next) => {
  const user = new User(req.body)
  await user.save()
    .then(result => {
      res.status(200).json({ message: "Succesfully signed up!"})
    })
    .catch(err => {
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    })
}

export const list = async (req, res) => {
  await User.find({}, 'name email updated created')
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ error: errorHandler.getErrorMessage(err) }))
}

export const userByID = async (req, res, next, id) => {
  await User.findById(id)
    .then(user => {
      if(!user) return res.status(400).json({ error: 'User not found' })
      req.profile = user
      next()
    })
    .catch(err => res.status(400).json({ error: 'User not found' }))
}

export const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

export const update = (req, res, next) => {
  let user = req.profile
  user = Object.assign(user, req.body)
  user.updated = Date.now()
  user.save()
    .then(user => {
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
    .catch(err => res.status(400).json({ error: errorHandler.getErrorMessage(err) }))
}

export const remove = (req, res, next) => {
  let user = req.profile
  user.remove()
    .then((deletedUser) => {
      deletedUser.hashed_password = undefined
      deletedUser.salt = undefined
      res.json(deletedUser)
    })
    .catch(err => res.status(400).json({ error: errorHandler.getErrorMessage(err) }))
}