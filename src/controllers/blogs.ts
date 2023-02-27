// import { Response } from 'express'
// import HttpResponse from '../utils/httpResponse';
// import { BlogRequest } from '../typings/interface';


export class BlogController {
//   public static async getAll(_req:BlogRequest,res:Response){
//     const query= 'SELECT id, title, author, url FROM blogs'
//     const [results] = await sequelize.query(query)
//     const httpResponse = HttpResponse.get(results)
//     res.status(200).json(httpResponse)
//   }
  
//   public static async addBlog(req: BlogRequest, res: Response) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const {title,author,url,id_user}=req.blog;
//   const query=`
//   INSERT INTO blogs
//   (
//     title, author, url, user_id
//   )
//   VALUES
//   (
//     '${title}', '${author}', '${url}','${Number(id_user)}'
//   )
// `;
// const [results] = await sequelize.query(query)
//     const httpResponse = HttpResponse.created(results)
//     res.status(201).json(httpResponse)
//   }

//   public static async getBlog(req: BlogRequest, res: Response) {
//     const id=Number(req.params.id)
//   const query=`SELECT username, name FROM users WHERE id = ${id}`
//   const [results]=await sequelize.query(query)
//   if (results.length) {
//     const httpResponse = HttpResponse.get(results)
//     res.status(201).json(httpResponse)
//   } else {
//     res.status(404).end()
//   }
//   }

//   public static async updateBlog(req: BlogRequest, res: Response) {
//     const id=Number(req.params.id)
//     const {title,author,url}=req.blog;
//     const query=`UPDATE blogs
//      SET title='${title}',
//       author='${author}',
//        url='${url}' 
//        WHERE id = ${id}
//        returning *`
//     const [results]=await sequelize.query(query)
//     if (results.length) {
//       const httpResponse = HttpResponse.updated(results)
//       res.status(200).json(httpResponse)
//     } else {
//       res.status(404).end()
//     }
//   }
}

export default BlogController