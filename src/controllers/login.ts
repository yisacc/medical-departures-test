// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
// import express from 'express'
// const loginRouter = express.Router();
// import asyncHandler from 'express-async-handler';
// import {sequelizeConnection as sequelize} from '../utils/db';
// import { SECRET } from '../utils/config';

// interface userInterface {
// username:string,
// hashpass:string,
// id:number,
// name:string
// }

// loginRouter.post('/', asyncHandler(async (req, res): Promise<any> => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const { username, password }:
//   {username:string, password:string} = req.body;
//   const query=`SELECT * FROM users WHERE username = '${username}'`
//   const [results]= await sequelize.query(query) 
//   const user=results[0]  as userInterface
//   console.log('results',await bcrypt.compare(password, user?.hashpass))
//   const passwordCorrect = !user?.id
//     ? false
//     : await bcrypt.compare(password, user?.hashpass)
//     console.log('passwordCorrect',passwordCorrect)
//   if (!(user?.username && passwordCorrect)) {
//     return res.status(401).json({
//       error: 'invalid username or password'
//     })
//   }

//   const userForToken = {
//     username: user.username,
//     id: user.id,
//   }

//   const token = jwt.sign(userForToken, SECRET!)

//   res
//     .status(200)
//     .send({ token, username: user.username, name: user.name })
// }))

// export default loginRouter