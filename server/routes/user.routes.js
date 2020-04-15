import express from 'express'
import * as userCtrl from '../controllers/user.controller.js'
import * as authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.param('userId', userCtrl.userByID)

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

export default router