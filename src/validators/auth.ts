import * as Joi from 'joi'

class AuthValidator {
  public login() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
  }
}

export default new AuthValidator()
