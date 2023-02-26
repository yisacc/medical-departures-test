import express from 'express'
const blogsRouter = express.Router();
import asyncHandler from 'express-async-handler';
import {sequelizeConnection as sequelize} from '../utils/db';

import {Blog} from '../models'
import HttpResponse from '../utils/httpResponse';




blogsRouter.get('/', asyncHandler(async (_req, res) => {
  const query= 'SELECT id, title, author, url FROM blogs'
  const [results] = await sequelize.query(query)
  const httpResponse = HttpResponse.get(results)
  res.status(200).json(httpResponse)
}))

blogsRouter.post('/', asyncHandler(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {title,author,url,user_id}:{title:string,author:string,url:string,user_id:string}=req.body;
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
const [results] = await sequelize.query(query)
    const httpResponse = HttpResponse.created(results)
    res.status(201).json(httpResponse)
}))

blogsRouter.get('/:id', asyncHandler(async (req, res) => {
  const id=Number(req.params.id)
  const query=`SELECT id, title, author, url FROM blogs WHERE id = ${id}`
  const [results]=await sequelize.query(query)
  if (results.length) {
    const httpResponse = HttpResponse.get(results)
    res.status(201).json(httpResponse)
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

blogsRouter.put('/:id', asyncHandler(async (req, res) => {
  const id=Number(req.params.id)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {title,author,url}:
  {title:string,author:string,url:string}=req.body;
  const query=`UPDATE blogs
   SET title='${title}',
    author='${author}',
     url='${url}' 
     WHERE id = ${id}
     returning *`
  const [results]=await sequelize.query(query)
  if (results.length) {
    const httpResponse = HttpResponse.updated(results)
    res.status(200).json(httpResponse)
  } else {
    res.status(404).end()
  }
}))

export default blogsRouter