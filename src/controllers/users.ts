import { Response } from 'express'
import {ResponseWrapper} from '../utils/httpResponse';
import {  UserInfoRequest } from '../typings/interface';
import UserService from '../services/user_service';
import { User } from '../models';




export class UserController {
  public static async getAll(req:UserInfoRequest,res:Response){
    const objSysAdmin = req.user 

    const userService: UserService = new UserService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await userService.getAllUsers())
  }
  
  public static async addUser(req: UserInfoRequest, res: Response) {
    const objSysAdmin = req.user 
    const { password } = req.body
    const user = new User({ hashpass: password, ...req.body })

    const userService: UserService = new UserService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await userService.addUser(user))
  }

  public static async getUser(req: UserInfoRequest, res: Response) {
    const objSysAdmin = req.user 
    const user = new User()
    user.id = parseInt(req.params.id_user)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.id_user)) return res.send({ success: false, data: { message: 'Invalid User Id' } })

    const userService: UserService = new UserService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await userService.getSingleUser(user))
  }

  public static async updateUser(req: UserInfoRequest, res: Response) {
    const objSysAdmin = req.user 
    const { password } = req.body
    const user = new User({ hashpass: password, ...req.body })
    user.id = parseInt(req.params.id_user)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.id_user)) return res.send({ success: false, data: { message: 'Invalid User Id' } })

    const userService: UserService = new UserService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await userService.updateUser(user))
  }

  public static async deleteUser(req: UserInfoRequest, res: Response) {
    const objSysAdmin = req.user 
    const user = new User()
    user.id = parseInt(req.params.id_user)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.id_user)) return res.send({ success: false, data: { message: 'Invalid User Id' } })

    const userService: UserService = new UserService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await userService.deleteUser(user))
  }
}



export default UserController