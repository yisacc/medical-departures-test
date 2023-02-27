import Helper from '../db_pool/helper';
import { NullableString } from '../typings/types';
import Common from './common';

export class User extends Common {
  public username: NullableString = undefined

  public name: NullableString = undefined

  public hashpass: NullableString = undefined


  constructor(model?: any) {
    super()
    if (model) {
      Helper.shallowCopy(model, this)
    }
  }
}

export default User