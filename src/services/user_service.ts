

import * as config from '../../config'
import { Auth, User } from '../models'
import { CommonService } from './common_service'
import * as logger from '../utils/logger'
import { TokenBody } from '../typings/interface'
import messages from '../constants'
import {sequelizeConnection as sequelize} from '../utils/db'
import Helper from '../db_pool/helper'
import bcrypt from 'bcrypt'

const jwt = require('njwt')

export class UserService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  public static async createToken(user: User): Promise<object> {
    const claims = {
      sub: user.username,
      iss: 'https://websiteapp.com',
      sbxUser: user,
    }
    const authObj: Auth = new Auth(config.server.apiUuid, config.server.tokenExpiration, user)
    const jwtObj = jwt.create(claims, authObj.tokenSecret)
    jwtObj.setExpiration(
      new Date().getTime() +
        authObj.tokenExpire!.days * 24 * 60 * 60 * 1000 +
        authObj.tokenExpire!.hours * 60 * 60 * 1000 +
        authObj.tokenExpire!.minutes * 60 * 1000 +
        authObj.tokenExpire!.seconds * 1000,
    )

    authObj.token = jwtObj.compact()
    authObj.tokenID = jwtObj.body.jti
    authObj.user = user
    return authObj.token
  }

  public static verifyToken(token: any): TokenBody {
    try {
      const verifiedToken = jwt.verify(token, config.server.apiUuid)
      return { success: true, tokenBody: verifiedToken.body }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  public static decodeToken(tokenBody: any): object {
    const dateNow = new Date()
    const timeNow = Math.round(dateNow.getTime() / 1000)
    const secsRem = tokenBody.exp - timeNow

    const authObj: Auth = new Auth(config.server.apiUuid, config.server.tokenExpiration)
    authObj.user = tokenBody.sbxUser
    authObj.username = tokenBody.sub
    authObj.expireSecs = secsRem
    authObj.tokenIssuedAt = new Date(tokenBody.iat * 1000)
    authObj.tokenID = tokenBody.jti

    return authObj
  }

  public responseObject(data: any) {
    return {
      id: data.id,
      username: data.username,
    }
  }

  // get all users
  public async getAllUsers(): Promise<{success:boolean,data:any}> {
    const sql = `SELECT id, username, deleted
			FROM users
			WHERE users.deleted = false`

    const [results] = await sequelize.query(sql)

    return {
      success: true,
      data: results,
    }
  }

  // add user
  public async addUser(user: User): Promise<any> {


    try {
      console.log(this.user_current)
      // insert user row
      const sql_user = `INSERT INTO users (username,name, hashpass,created_by,created_date)
				VALUES ('${user.username}','${user.name}', '${user.hashpass}', ${this.user_current.id}, '${new Date().toUTCString()}') returning id`
console.log(sql_user)
      const [results] = await sequelize.query(sql_user)

      return {
        success: true,
        data: {
          message: messages.success.insert,
          id_user: results,
        },
      }
    } catch (error) {
      logger.error(`UserService.addUser() Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }

  // login using username AND password AND get user details AND auth token
  public static async login(username: string, password: string) {
    return this.getUserAndAuthToken(username, password)
  }

  // get user AND auth token without password
  public static async refreshToken(username: string) {
    return this.getUserAndAuthToken(username, '')
  }

  // Gets user details AND auth token
  public static async getUserAndAuthToken(
    username: string,
    password:string,
  ) {
    try {
      let sql = `SELECT id,username, hashpass, deleted
						From users
						WHERE users.deleted = false 
						AND users.username = $1`
      let params = [username]


      const [results]= await sequelize.query(sql,{ bind:params})

      if (results.length <= 0) {
        throw { message: messages.errors.user.invalidUserPassword, status: 400 }
      }
      if(!(await bcrypt.compare(password, (results as any)[0].hashpass))){
        throw { message: messages.errors.user.invalidUserPassword, status: 400 }
      }
      const result = results[0] as User

      const user = Helper.getUser(result)
      const token = await UserService.createToken(user)
        return {
          success: true,
          data: {
            message: messages.success.user.login,
            authToken: token,
            user: user,
          },
        }

    } catch (error) {
      logger.error(`UserService.addUser() Error: ${error}`)
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  public async getSingleUser(user: User) {
    const UserID = user.id
    try {
      const sql = `SELECT id, username,name, deleted
      FROM users
      WHERE users.deleted = false 
      AND users.id = $1 `

      const params = [UserID]

      const [results] = await sequelize.query(sql, {bind:params})

      if (results.length <= 0) {
        throw { message: messages.errors.notFound, status: 404 }
      }
      const result = results[0] as User
      const getUser = Helper.getUser(result)
      return { success: true, data: { getUser } }
    } catch (error) {
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  public async updateUser(user: User) {
    try {
      let user_columns = `username = '${user.username}'`
      if (user.hashpass) user_columns += `, hashpass = '${user.hashpass}'`
      // update users
      const user_sql = `UPDATE users SET ${user_columns} WHERE id = '${user.id}'`

      const [results] = await sequelize.query({query:user_sql, values:[]})
      if (!results.length) throw { message: 'User does not exist', status: 404 }

      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`UserService.updateUser() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

}

export default UserService
