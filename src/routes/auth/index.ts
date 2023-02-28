import express from 'express'
import Schema from '../../middlewares/schema'
import AuthValidator from '../../validators/auth'
import { wrapper } from '../../utils/helpers'
import { AuthController } from '../../controllers/auth'

const authRouter = express.Router()

/**
 * @openapi
 *
 * /v0/auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary : Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/schemas/login'
 */
authRouter.post(
    '/login',
    (req, res, next) => {
        Schema.handle(req, res, next, AuthValidator.login())
    },
    wrapper(AuthController.login)
)



export default authRouter
