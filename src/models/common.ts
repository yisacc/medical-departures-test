import Helper from '../db_pool/helper'
import * as logger from '../utils/logger'

import { NullableNumber, NullableDate, NullableBoolean, NullableString } from '../typings/types'

export class Common {
  public id: NullableNumber = undefined

  public created_date: NullableDate = undefined

  public created_by: NullableNumber = undefined

  public delete: NullableBoolean = undefined

  public deleted_by: NullableNumber = undefined

  public deleted_date: NullableDate = undefined

  public modified_by: NullableNumber = undefined

  public modified_date: NullableDate = undefined

  public _table_name: NullableString = undefined

  public copyFrom(copyObj: any) {
    Helper.shallowCopy(copyObj, this)
  }

  public setTableName(table_name: string) {
    this._table_name = table_name
  }

  public getTableName() {
    return this._table_name
  }

  dump() {
    logger.info(this)
  }

  hasUserProperty(prop: any) {
    return this.hasOwnProperty(prop)
  }
}

export default Common
