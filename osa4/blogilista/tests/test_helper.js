const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testi blogi',
    author: 'Pertti',
    url: 'www.test.blog.eu',
    likes: 723,
    id: '5d8c8a43770de5439096e54b'
  },
  {
    title: 'Testi blogi2',
    author: 'Pertti',
    url: 'www.blog.eu',
    likes: 21,
    id: '5d8c8acb770de5439096e54c'
  },
  {
    title: 'Testi blogi3',
    author: 'Perttu',
    url: 'www.blog1.eu',
    likes: 24,
    id: '5d8ca875eec2d837788aa8fb'
  },

]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}