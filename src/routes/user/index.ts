import express from 'express'
import UserController from '../../controllers/users';
import { wrapper } from '../../utils/helpers';
import Schema from '../../middlewares/schema';
import UserValidator from '../../validators/user'
const usersRouter = express.Router();


usersRouter.get('/',
  wrapper(UserController.getAll)
)
usersRouter.get('/:id', 
wrapper(UserController.getUser)
)

usersRouter.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.user())
  },
  wrapper(UserController.addUser)
)

usersRouter.put(
  '/:id',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.editUser())
  },
  wrapper(UserController.updateUser)
)

export default usersRouter