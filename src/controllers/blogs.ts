import { Response } from 'express'
import { Blog } from '../models';
import BlogService from '../services/blog_service';
import { BlogRequest } from '../typings/interface';
import { ResponseWrapper } from '../utils/httpResponse';


export class BlogController {

  public static async getAll(req:BlogRequest,res:Response){
    const objSysAdmin = req.user 
    
    const blogService: BlogService = new BlogService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await blogService.getAllBlogs())
  }
  
  public static async addBlog(req: BlogRequest, res: Response) {
    const objSysAdmin = req.user 
    const blog = new Blog({ ...req.body })

    const blogService: BlogService = new BlogService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await blogService.addBlog(blog))
  }

  public static async getBlog(req: BlogRequest, res: Response) {
    const objSysAdmin = req.user 
    const blog = new Blog()
    blog.id = parseInt(req.params.id_blog)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.id_blog)) return res.send({ success: false, data: { message: 'Invalid Blog Id' } })

    const blogService: BlogService = new BlogService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await blogService.getSingleBlog(blog))
  }


  public static async updateBlog(req: BlogRequest, res: Response) {
    const objSysAdmin = req.user 
    const blog = new Blog({ ...req.body })
    blog.id = parseInt(req.params.id_blog)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.id_blog)) return res.send({ success: false, data: { message: 'Invalid Blog Id' } })

    const blogService: BlogService = new BlogService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await blogService.updateBlog(blog))
  }
  public static async deletBlog(req: BlogRequest, res: Response) {
    const objSysAdmin = req.user 
    const blog = new Blog()
    blog.id = parseInt(req.params.id_blog)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.id_blog)) return res.send({ success: false, data: { message: 'Invalid Blog Id' } })

    const blogService: BlogService =  new BlogService(objSysAdmin)
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await blogService.deleteBlog(blog))
  }
}

export default BlogController