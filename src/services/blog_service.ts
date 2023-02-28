

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
    const sql = `SELECT blogs.id, blogs.title,blogs.author,blogs.url, blogs.deleted, users.username as creator,users.id as id_user
    FROM blogs
    LEFT OUTER JOIN user_blogs on user_blogs.id_blog=blogs.id AND user_blogs.deleted=false
    LEFT OUTER JOIN users on users.id=user_blogs.id_user AND users.deleted=false
			WHERE blogs.deleted = false`

    const [results] = await sequelize.query(sql)

    return {
      success: true,
      data: results,
    }
  }

  // add blog
  public async addBlog(blog: Blog): Promise<any> {


    try {
      // insert blog row
      const sql_blog = `INSERT INTO blogs (title, author,url, created_by,created_date)
				VALUES ('${blog.title}', '${blog.author}','${blog.url}', ${this.user_current.id}, '${new Date().toUTCString()}') returning id`
        const [results] = await sequelize.query({query:sql_blog, values:[]})
        const blogResult=(results as any)[0]
        const user_blog_params = [this.user_current.id,blogResult.id]
              // insert user blogs row
      const sql_user_blogs = `INSERT INTO user_blogs (id_user, id_blog)
      VALUES ($1, $2) returning id`
      const userBlogResult= await sequelize.query(sql_user_blogs,{bind:user_blog_params})
      return {
        success: true,
        data: {
          message: messages.success.insert,
          id_blog: blogResult.id,
          id_user_role: (userBlogResult as any)[0].id,
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
      const sql = `SELECT blogs.id, blogs.title,blogs.author,blogs.url, blogs.deleted, users.username as creator,users.id as id_user
      FROM blogs
      LEFT OUTER JOIN user_blogs on user_blogs.id_blog=blogs.id AND user_blogs.deleted=false
      LEFT OUTER JOIN users on users.id=user_blogs.id_user AND users.deleted=false
      WHERE blogs.deleted = false 
      AND blogs.id = $1 `

      const params = [BlogId]

      const [results] = await sequelize.query(sql, {bind:params})
      console.log('blogs',results[0])

      if (results.length <= 0) {
        throw { message: messages.errors.notFound, status: 404 }
      }

      return { success: true, data: results  }
    } catch (error) {
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  public async updateBlog(blog: Blog) {
    try {
      let blog_columns = `title = '${blog.title}'`
      blog_columns += `, author = '${blog.author}'`
      blog_columns += `, url = '${blog.url}'`
      blog_columns += `, modified_by = ${this.user_current.id}`
      blog_columns += `, modified_date = '${new Date().toUTCString()}'`
      // update blogs
      const blog_sql = `UPDATE blogs SET ${blog_columns} WHERE id = '${blog.id}'`

      const [results,metadata] = await sequelize.query({query:blog_sql, values:[]})
      console.log(results)
      if (!(metadata as any).rowCount) throw { message: 'Blog does not exist', status: 404 }
    
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`BlogService.updateBlog() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteBlog(blog: Blog) {
    try {
      let blog_columns = `deleted = true`
      blog_columns += `, deleted_by = ${this.user_current.id}`
      blog_columns += `, deleted_date = '${new Date().toUTCString()}'`
      // update blogs
      const blog_sql = `UPDATE blogs SET ${blog_columns} WHERE id = ${blog.id}`

      const [results,metadata] = await sequelize.query(blog_sql)
      console.log(results)
      if (!(metadata as any).rowCount) throw { message: 'User does not exist', status: 404 }

      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`BlogService.deleteBlog() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

}

export default BlogService
