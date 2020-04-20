import fs from 'fs'
import formidable from 'formidable'
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
    .populate('following', '_id name')
    .populate('followers', '_id name')
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
  let form = formidable({ keepExtensions: true })
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(400).json({ error: "Photo could not be uploaded"})

    let user = req.profile
    user = Object.assign(user, fields)
    user.updated = Date.now()
    if(files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path, { encoding: null /*i.e. Buffer*/})
      user.photo.contentType = files.photo.type
    }
    user.save()
      .then(user => {
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
      })
      .catch(err => res.status(400).json({ error: errorHandler.getErrorMessage(err) }))
  })

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

export const photo = (req, res, next) => {
  if(req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

import profileImage from '../../client/assets/images/profile-pic.png'
export const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + profileImage /** e.g. "/dist/<hash>.png" */)
}

export const addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId }})
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    })
  next()
}

export const addFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId }}, {new:true})
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .then(result => {
      result.hashed_password = undefined
      result.salt = undefined
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    })
}

export const removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId }})
    .then(result => { next() })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    })
}

export const removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId, {$pull: { followers: req.body.userId }}, {new: true})
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .then(result => {
      result.hashed_password = undefined
      result.salt = undefined
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    })
}