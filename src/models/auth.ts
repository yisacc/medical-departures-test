import {
    NullableAny,
    NullableString,
    NullableTokenExpire,
    NullableUser,
  } from '../typings/types'
  
  import { TokenExpire } from '../typings/interface'
  
  export class Auth {
    public username: NullableString = undefined
  
    public user: NullableUser = undefined
  
    public token: NullableAny = undefined
  
    public tokenID: NullableAny = undefined
  
    public tokenBody: NullableAny = undefined
  
    public expireSecs: NullableAny = undefined
  
    public tokenIssuedAt: NullableAny = undefined
  
    public tokenSecret: NullableString = undefined
  
    public tokenExpire: NullableTokenExpire = undefined
  
    constructor(tokenSecret: string, tokenExpire: TokenExpire, userOb?: any) {
      this.tokenSecret = tokenSecret
      this.tokenExpire = tokenExpire
      if (userOb) {
        this.user = userOb
      }
      return this
    }
  }
  
  export default Auth
  