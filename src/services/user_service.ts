

import Helper from '../db_pool/helper'
import * as config from '../../config'
import { Auth, User } from '../models'
import PGPool from '../db_pool/pg_pool'
import { CommonService } from './common_service'
import * as logger from '../utils/logger'
import { TokenBody } from '../typings/interface'
import messages from '../constants'

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
  public async getAllUsers(): Promise<any> {
    const sql = `SELECT users.id, users.username, users.deleted
			FROM users
			WHERE users.deleted = false`

    const pool = Helper.pool()
    const query_results = await pool.aquery(this.user_current, sql)

    return {
      success: true,
      data: query_results.rows,
    }
  }

  // add user
  public async addUser(user: User, pool?: PGPool): Promise<any> {
    let pooldefinedLocally = false

    // pool is not supplied, create one AND start transaction
    if (pool === undefined) {
      pooldefinedLocally = true
      pool = Helper.pool()
      // begin transaction
      await Helper.beginTransaction(pool, this.user_current)
    }

    try {
      // insert user row
      const sql_user = `INSERT INTO users (username, hashpass)
				VALUES ('${user.username}', '${user.hashpass}') returning id`

      const userResult = await pool.aquery(this.user_current, sql_user, [])

      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool, this.user_current)

      return {
        success: true,
        data: {
          message: messages.success.insert,
          id_user: userResult.rows[0].id,
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
    const pool = Helper.pool()
    const cUser = Helper.defaultUser()
    try {
      let sql = `SELECT id,username, deleted
						From users
						WHERE users.deleted = false 
						AND users.username = $1 
                        AND hashpass=crypt($2, hashpass)`
      let params = [username, password]


      const query_results = await pool.aquery(cUser, sql, params)

      if (query_results.rowCount <= 0) {
        throw { message: messages.errors.user.invalidUserPassword, status: 400 }
      }

      const user = Helper.getUser(query_results.rows[0])
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
    const pool = Helper.pool()
    const cUser = Helper.defaultUser()
    const UserID = user.id
    try {
      const sql = `SELECT id, username, deleted
      FROM users
      WHERE users.deleted = false 
      AND users.id = $1 `

      const params = [UserID]

      const query_results = await pool.aquery(cUser, sql, params)

      if (query_results.rowCount <= 0) {
        throw { message: messages.errors.notFound, status: 404 }
      }

      const getUser = Helper.getUser(query_results.rows[0])
      return { success: true, data: { getUser } }
    } catch (error) {
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  public async updateUser(user: User) {
    const pool = Helper.pool()
    try {
      // begin transaction
      await Helper.beginTransaction(pool, this.user_current)
      let user_columns = `username = '${user.username}'`
      if (user.hashpass) user_columns += `, hashpass = '${user.hashpass}'`
      // update users
      const user_sql = `UPDATE users SET ${user_columns} WHERE id = '${user.id}'`

      const res = await pool.aquery(this.user_current, user_sql, [])
      if (!res.rowCount) throw { message: 'User does not exist', status: 404 }

      await pool.aquery(this.user_current, [] as any)

      //commit transaction
      await Helper.commitTransaction(pool, this.user_current)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`UserService.updateUser() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

}

export default UserService
