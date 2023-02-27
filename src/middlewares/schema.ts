import { Response, Request, NextFunction } from 'express'

class SchemaMiddleware {
  public static async handle(req: Request, res: Response, next: NextFunction, Validator: any) {
    try {
      if (Validator) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await Validator.validateAsync(req.body)
      }
      return next()
    } catch (error) {
      return res.send({
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { message: error.details[0].message },
      })
    }
  }
}

export default SchemaMiddleware