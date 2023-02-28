

import { Blog } from '../models'
import { CommonService } from './common_service'
import * as logger from '../utils/logger'
import messages from '../constants'
import {sequelizeConnection as sequelize} from '../utils/db'


export class BlogService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  public responseObject(data: any) {
    return {
      id: data.id,
      username: data.username,
    }
  }

  // get all blogs
  public async getAllBlogs(): Promise<any> {
    const sql = `SELECT id, title,author, deleted
			FROM blogs
			WHERE deleted = false`

    const [results] = await sequelize.query(sql)

    return {
      success: true,
      data: results,
    }
  }

  // add blog
  public async addBlog(blog: Blog): Promise<any> {


    try {
      // insert user row
      const sql_blog = `INSERT INTO blog (title, author)
				VALUES ('${blog.title}', '${blog.author}') returning id`

      const [results] = await sequelize.query({query:sql_blog, values:[]})

      return {
        success: true,
        data: {
          message: messages.success.insert,
          id_user: results,
        },
      }
    } catch (error) {
      logger.error(`BlogService.addBlog() Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }



  public async getSingleBlog(blog: Blog) {
    const BlogId = blog.id
    try {
      const sql = `SELECT id, title,author,url, deleted
      FROM blogs
      WHERE deleted = false 
      AND id = $1 `

      const params = [BlogId]

      const [results] = await sequelize.query({query:sql, values:params})

      if (results.length <= 0) {
        throw { message: messages.errors.notFound, status: 404 }
      }

      return { success: true, data: { results } }
    } catch (error) {
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  public async updateBlog(blog: Blog) {
    try {
      let blog_columns = `title = '${blog.title}'`
      blog_columns += `, author = '${blog.author}'`
      blog_columns += `, url = '${blog.url}'`
      // update blogs
      const blog_sql = `UPDATE blogs SET ${blog_columns} WHERE id = '${blog.id}'`

      const [results] = await sequelize.query({query:blog_sql, values:[]})
      if (!results.length) throw { message: 'Blog does not exist', status: 404 }

      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`BlogService.updateBlog() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

}

export default BlogService
