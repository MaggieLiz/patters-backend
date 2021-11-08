import express from 'express'

import pattern from '../controllers/patterns.js'
import users from '../controllers/users.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()
// * Patterns Requests
router
  .route('/patterns')
  .get(pattern.index)
  .post(pattern.create)

router 
  .route('/patterns/:patternID')
  .get(pattern.show)
  .put(pattern.update)
  .delete(pattern.delete)

router.route('/patterns/:patternID/comments')
  .post(pattern.createComment)  

router.route('/patterns/:patternID/comments/:commentID')  
  .delete(pattern.deleteComment)
  .put(pattern.updateComment)

// * User Requests
router.route('/users')
  .get(users.userIndex)
  .post(secureRoute, users.createUser)

router.route('/users/:userID')
  .get(users.showUser)
  .put(secureRoute, users.editUser)
  .delete(secureRoute, users.deleteUser)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

router.route('/profile')
  .get(secureRoute, auth.userProfile)

export default router