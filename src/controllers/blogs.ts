import express from 'express'
const blogsRouter = express.Router();
import asyncHandler from 'express-async-handler';
import {sequelizeConnection as sequelize} from '../utils/db';

import {Blog} from '../models'
import HttpResponse from '../utils/httpResponse';




blogsRouter.get('/', asyncHandler(async (_req, res) => {
  const query= 'SELECT "id", "title", "author", "url" FROM blogs'
  const blogs = await sequelize.query(query,{
    model:Blog,
    mapToModel:true
  })
  const httpResponse = HttpResponse.get(blogs)
  res.status(200).json(httpResponse)
}))

blogsRouter.post('/', asyncHandler(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {title,author,url,user_id}=req.body;
  const query=`
  INSERT INTO blogs
  (
    title, author, url, user_id
  )
  VALUES
  (
    '${title}', '${author}', '${url}','${Number(user_id)}'
  )
`;
    const blog = await sequelize.query(query)
    const httpResponse = HttpResponse.created(blog)
    res.status(201).json(httpResponse)
}))

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