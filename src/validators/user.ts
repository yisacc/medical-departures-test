import * as Joi from 'joi'

class UserValidator {
  public user() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required()
    })
  }

  public editUser() {
    return Joi.object({
      username: Joi.string().required(),
      name: Joi.string().required()
    })
  }
}

export default new UserValidator()
