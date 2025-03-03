const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { title, author, url, likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {title, author, url, likes},
      {new: true, runValidators: true}
    )
    response.json(updatedBlog)
})
 
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {

  const {title, author, url, likes} = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter