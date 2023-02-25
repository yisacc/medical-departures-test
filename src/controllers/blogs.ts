import express from 'express'
const blogsRouter = express.Router();
import asyncHandler from 'express-async-handler';

import {Blog} from '../models'
import HttpResponse from '../utils/httpResponse';




blogsRouter.get('/', asyncHandler(async (_req, res) => {
  //SELECT "id", "title", "author", "url" FROM "blogs" AS "blog"
  const blogs = await Blog.findAll()
  const httpResponse = HttpResponse.get(blogs)
  res.status(200).json(httpResponse)
}))

// blogsRouter.post('/', asyncHandler(async (req, res) => {
//     const blog = await Blog.create(req.body)
//     const httpResponse = HttpResponse.get(blog)
//     res.status(201).json(httpResponse)
// }))

blogsRouter.get('/:id', asyncHandler(async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
}))

blogsRouter.delete('/:id', asyncHandler(async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy()
  }
  res.status(204).end()
}))

// blogsRouter.put('/:id', asyncHandler(async (req, res) => {
//   const blog = await Blog.findByPk(req.params.id)
//   if (blog) {
//     blog.title = req.body.title
//     await blog.save()
//     res.json(blog)
//   } else {
//     res.status(404).end()
//   }
// }))

export default blogsRouter