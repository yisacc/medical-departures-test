
import express from 'express'
import Schema from '../../middlewares/schema'
import AuthValidator from '../../validators/auth'
import { wrapper } from '../../utils/helpers'
import { AuthController } from '../../controllers/auth'

const authRouter = express.Router()


authRouter.post(
    '/login',
    (req, res, next) => {
        Schema.handle(req, res, next, AuthValidator.login())
    },
    wrapper(AuthController.login)
)



export default authRouter
