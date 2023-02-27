import { Router } from 'express'
// import loginRouter from '../controllers/login'
import blogsRouter from './blog'
import usersRouter from './user'

const router = Router()

// router.use('/login', loginRouter)

router.use('/blogs', blogsRouter)

router.use('/users', usersRouter)

export default router
