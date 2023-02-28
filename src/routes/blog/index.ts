import express from 'express'
import { wrapper } from '../../utils/helpers';
import Schema from '../../middlewares/schema';
import BlogValidator from '../../validators/blog'
import BlogController from '../../controllers/blogs';
import { CheckAuth } from '../../middlewares/check_auth';
const blogsRouter = express.Router();


blogsRouter.get('/',
(req, res, next) => {
  CheckAuth.check(req, res, next)
},
  wrapper(BlogController.getAll)
)

blogsRouter.get('/:id_blog',
(req, res, next) => {
  CheckAuth.check(req, res, next)
}, 
wrapper(BlogController.getBlog)
)

blogsRouter.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, BlogValidator.blog())
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next)
  },
  wrapper(BlogController.addBlog)
)

blogsRouter.put(
  '/:id_blog',
  (req, res, next) => {
    Schema.handle(req, res, next, BlogValidator.editBlog())
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next)
  },
  wrapper(BlogController.updateBlog)
)

blogsRouter.delete(
    '/:id_blog',
    (req, res, next) => {
      CheckAuth.check(req, res, next)
    },
    wrapper(BlogController.deletBlog)
  )

export default blogsRouter