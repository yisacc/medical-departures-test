import { Router } from 'express'
import blogsRouter from '../controllers/blogs'
import loginRouter from '../controllers/login'
import usersRouter from './user/index'

const router = Router()

router.use('/login', loginRouter)

router.use('/blogs', blogsRouter)

router.use('/users', usersRouter)

export default router
