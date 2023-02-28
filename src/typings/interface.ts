import { User as UserModel, Blog as BlogModel } from '../models'
import { Request } from 'express'

export interface TokenExpire {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface TokenBody {
  success: boolean
  tokenBody?: any
  error?: Error
}

export interface UserInfoRequest extends Request {
  user: UserModel
}
export interface BlogRequest extends Request {
  blog: BlogModel,
  user: UserModel
}

export interface SQLStatementInsert {
  columns: string
  param_ids: string
  param_values: Array<any>
}

export interface SQLStatementUpdate {
  columns: string
  param_values: Array<any>
}
