const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  try {
	  if (token === null || token === undefined) {
		return response.status(401).json({ error: 'token missing or invalid' }) 
	  } 
	  const decodedToken = jwt.verify(token, process.env.SECRET)
	  if (!token || !decodedToken.id) {
		  return response.status(401).json({ error: 'token missing or invalid' })
	  }
	  
	  const user = await User.findById(decodedToken.id)
	  
	  const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === '' ? 0 : body.likes,
		user: user._id
	  })
	  
	  const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
	  await user.save()
	  response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
	if (request.token === null || request.token === undefined) {
		return response.status(401).json({ error: 'token missing or invalid' }) 
	}
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const user = await User.findById(decodedToken.id)
	const blog = await Blog.findById(request.params.id)
	
	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
	} else {
		return response.status(405).json({ error: 'not allowed' })
	}
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


module.exports = blogsRouter