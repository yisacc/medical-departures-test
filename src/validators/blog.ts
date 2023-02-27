import * as Joi from 'joi'

class BlogValidator {
  public blog() {
    return Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      url: Joi.string()
    })
  }

  public editBlog() {
    return Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      url: Joi.string()
    })
  }
}

export default new BlogValidator()
