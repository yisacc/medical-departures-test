import { Response, Request, NextFunction } from 'express'
import { ResponseWrapper } from '../utils/httpResponse'
import UserService from '../services/user_service'

export class AuthController {
  public static async login(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const { username, password } = req.body
    console.log('username',username)

    const result = await UserService.login(username, password)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(result)
  }
}
