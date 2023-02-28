import { User } from "../models"


export class Helper {
  public static getUser(user: User) {
    const _user: User = new User()
    Helper.shallowCopy(user, _user)
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

}

export default Helper
