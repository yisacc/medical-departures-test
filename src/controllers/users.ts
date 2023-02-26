import express from 'express'
const usersRouter = express.Router();
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import {sequelizeConnection as sequelize} from '../utils/db';

import {User} from '../models'
import HttpResponse from '../utils/httpResponse';




usersRouter.get('/', asyncHandler(async (_req, res) => {
  const query= 'SELECT * FROM users'
  const blogs = await sequelize.query(query,{
    model:User,
    mapToModel:true
  })
  const httpResponse = HttpResponse.get(blogs)
  res.status(200).json(httpResponse)
}))

usersRouter.post('/', asyncHandler(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {password,username,name}:{password:string,username:string,name:string}=req.body;
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds) 
  const query=`
  INSERT INTO users
  (
    username, name, passwordHash
  )
  VALUES
  (
    '${username}', '${name}', '${passwordHash}'
  )
`;
    const blog = await sequelize.query(query)
    const httpResponse = HttpResponse.created(blog)
    res.status(201).json(httpResponse)
}))

export default usersRouter