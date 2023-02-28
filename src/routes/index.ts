import { Router } from 'express'
import authRouter from './auth'
import blogsRouter from './blog'
import usersRouter from './user'

const router = Router()

router.use('/auth', authRouter)

router.use('/blogs', blogsRouter)

router.use('/users', usersRouter)

export default router
