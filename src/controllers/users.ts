import express from 'express'
const usersRouter = express.Router();
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import {sequelizeConnection as sequelize} from '../utils/db';
import HttpResponse from '../utils/httpResponse';




usersRouter.get('/', asyncHandler(async (_req, res) => {
  const query= 'SELECT id,username,name FROM users'
  const [results] = await sequelize.query(query)
  const httpResponse = HttpResponse.get(results)
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
  RETURNING id
`;
    const [results] = await sequelize.query(query)
    const httpResponse = HttpResponse.created(results)
    res.status(201).json(httpResponse)
}))

usersRouter.get('/:id', asyncHandler(async (req, res) => {
  const id=Number(req.params.id)
  const query=`SELECT username, name FROM users WHERE id = ${id}`
  const [results]=await sequelize.query(query)
  if (results.length) {
    const httpResponse = HttpResponse.get(results)
    res.status(201).json(httpResponse)
  } else {
    res.status(404).end()
  }
}))

usersRouter.put('/:id', asyncHandler(async (req, res) => {
  const id=Number(req.params.id)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {username,name}:
  {username:string,name:string}=req.body;
  const query=`UPDATE users
   SET username='${username}',
    name='${name}'
     WHERE id = ${id}
     returning id,username,name`
  const [results]=await sequelize.query(query)
  if (results.length) {
    const httpResponse = HttpResponse.updated(results)
    res.status(200).json(httpResponse)
  } else {
    res.status(404).end()
  }
}))

export default usersRouter