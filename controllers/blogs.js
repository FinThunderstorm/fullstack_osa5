/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  res.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  try{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id
    })
  
    if(blog.likes === undefined){
      blog.likes = 0
    } else {
      blog.likes = body.likes
    }
  
    if(blog.title === undefined || blog.url === undefined) {
      return res.status(400).json({
        error: 'title or url missing'
      })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog.toJSON())
  } catch(e){
    next(e)
  }
  
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(req.params.id)

    if(blog.user.toString() === decodedToken.id.toString()){
      await Blog.findByIdAndDelete(req.params.id)
      return res.status(204).end()
    }
    res.status(401).json({ error: 'unauthorized'})
    
  }catch(e){
    next(e)
  }


  
})

blogsRouter.put('/:id', async (req, res, next) => {
  console.log('req: ',req.body)
  console.log('id: ',req.params.id)
  try{
    const blog = await Blog.findById(req.params.id)
    console.log('blog: ', blog)
    blog.likes = blog.likes + 1
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    
    console.log('updatedBlog: ',updatedBlog)
    res.json(updatedBlog.toJSON())
  }catch(e){
    
    console.log('blog: ', blog)
    console.log('updatedBlog: ',updatedBlog)
    next(e)
  }

  

})

module.exports = blogsRouter