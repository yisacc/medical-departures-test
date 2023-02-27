import express from 'express'
// import { wrapper } from '../../utils/helpers';
// import Schema from '../../middlewares/schema';
// import BlogValidator from '../../validators/blog'
// import BlogController from '../../controllers/blogs';
const blogsRouter = express.Router();


// blogsRouter.get('/',
//   wrapper(BlogController.getAll)
// )
// blogsRouter.get('/:id', 
// wrapper(BlogController.getBlog)
// )

// blogsRouter.post(
//   '/',
//   (req, res, next) => {
//     Schema.handle(req, res, next, BlogValidator.blog())
//   },
//   wrapper(BlogController.addBlog)
// )

// blogsRouter.put(
//   '/:id',
//   (req, res, next) => {
//     Schema.handle(req, res, next, BlogValidator.editBlog())
//   },
//   wrapper(BlogController.updateBlog)
// )

export default blogsRouter