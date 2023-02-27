

import PGPool from './pg_pool'
import { User } from '../models'
import * as config from '../../config'
import { SQLStatementInsert, SQLStatementUpdate } from '../typings/interface'


export class Helper {
  public static getUser(user: User) {
    const _user: User = new User()
    Helper.shallowCopy(user, _user)
    return _user
  }

  public static pool() {
    return new PGPool(config.dbObj)
  }

  public static defaultUser() {
    const _user: User = new User()
    _user.username = 'user_default'
    return _user
  }


  public static shallowCopy(source: any, target: any) {
    Object.keys(target).forEach((key) => {
      if (source[key] !== undefined) {
        target[key] = source[key]
      }
    })

    return target
  }

  public static getSQLSatementInsert(source: any): SQLStatementInsert {
    const sql_columns: Array<string> = []
    const sql_columns_params: Array<string> = []
    const sql_values: Array<any> = []
    let i = 1

    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined && key !== 'id' && key !== '_table_name') {
        sql_columns.push(key)
        sql_columns_params.push(`$${i++}`)
        sql_values.push(source[key])
      }
    })

    return { columns: sql_columns.join(','), param_ids: sql_columns_params.join(','), param_values: sql_values }
  }

  public static getSQLSatementUpdate(source: any): SQLStatementUpdate {
    const sql_columns: Array<string> = []
    const sql_values: Array<any> = []
    let i = 1

    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined && key !== 'id' && key !== '_table_name') {
        sql_columns.push(`${key} = $${i++}`)
        sql_values.push(source[key])
      }
    })

    return { columns: sql_columns.join(','), param_values: sql_values }
  }
}

export default Helper
