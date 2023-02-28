import { Response, Request, NextFunction } from 'express'
import UserService from '../services/user_service'

export class CheckAuth {
  public static async check(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    const vToken = UserService.verifyToken(token)
    if (!vToken.success) {
      return res.send({
        success: false,
        data: { message: 'Invalid Token' },
      })
    }

    const cUser = vToken.tokenBody?.sbxUser
    cUser.username = vToken.tokenBody?.sbxUser?.username || 'user_default'

    if (cUser) {
      // @ts-ignore: Unreachable code error
      req.user = cUser
    }

      return next()
    
  }
}

export default new CheckAuth()
