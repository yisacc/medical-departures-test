import Helper from '../db_pool/helper';
import {  NullableString } from '../typings/types';
import Common from './common';

export class Blog extends Common {
  public title: NullableString = undefined

  public author: NullableString = undefined

  public url: NullableString = undefined


  constructor(model?: any) {
    super()
    if (model) {
      Helper.shallowCopy(model, this)
    }
  }
}

export default Blog