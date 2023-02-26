import Blog from './blog'
import User from './user'
import UserBlogs from './userBlog'

User.hasMany(Blog)
Blog.belongsTo(User)


User.belongsToMany(Blog, { through: UserBlogs, as: 'authoredBlogs' })
Blog.belongsToMany(User, { through: UserBlogs, as: 'usersAuthored' })

export {
    Blog,
    User
}