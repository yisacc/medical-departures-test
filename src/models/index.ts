import Blog from './blog'

Blog.sync()
.catch((err)=>{console.log('error',err)})

export {
    Blog,
}