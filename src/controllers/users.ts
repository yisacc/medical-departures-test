import { Response } from 'express'
import bcrypt from 'bcrypt';
import {sequelizeConnection as sequelize} from '../utils/db';
import HttpResponse from '../utils/httpResponse';
import { CUserAuthInfoRequest } from '../typings/interface';




export class UserController {
  public static async getAll(_req:CUserAuthInfoRequest,res:Response){
    const query= 'SELECT id,username,name FROM users'
    console.log('called')
    const [results] = await sequelize.query(query)
    const httpResponse = HttpResponse.get(results)
    res.status(200).json(httpResponse)
  }
  
  public static async addUser(req: CUserAuthInfoRequest, res: Response) {
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
  }

  public static async getUser(req: CUserAuthInfoRequest, res: Response) {
    const id=Number(req.params.id)
  const query=`SELECT username, name FROM users WHERE id = ${id}`
  const [results]=await sequelize.query(query)
  if (results.length) {
    const httpResponse = HttpResponse.get(results)
    res.status(201).json(httpResponse)
  } else {
    res.status(404).end()
  }
  }

  public static async updateUser(req: CUserAuthInfoRequest, res: Response) {
    const id=Number(req.params.id)
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
  }
}



export default UserController