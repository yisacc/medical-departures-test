import express from 'express'
import UserController from '../../controllers/users';
import { wrapper } from '../../utils/helpers';
import Schema from '../../middlewares/schema';
import UserValidator from '../../validators/user'
import { CheckAuth } from '../../middlewares/check_auth';
const usersRouter = express.Router();


usersRouter.get('/',
(req, res, next) => {
  CheckAuth.check(req, res, next)
}, 
  wrapper(UserController.getAll)
)
usersRouter.get('/:id_user',
(req, res, next) => {
  CheckAuth.check(req, res, next)
},  
wrapper(UserController.getUser)
)

usersRouter.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.user())
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next)
  },
  wrapper(UserController.addUser)
)

usersRouter.put(
  '/:id_user',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.editUser())
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next)
  },
  wrapper(UserController.updateUser)
)
usersRouter.delete(
  '/:id_user',
  (req, res, next) => {
    CheckAuth.check(req, res, next)
  },
  wrapper(UserController.deleteUser)
)
export default usersRouter