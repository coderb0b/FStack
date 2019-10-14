const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: "Testi blogi",
		author: "Pertti",
		id: "5d8c8a43770de5439096e54b"
	},
	{
		title: "Testi blogi",
		author: "Pertti",
		url: "www.blog.eu",
		likes: 21,
		id: "5d8c8acb770de5439096e54c"
	},
	{
		title: "Testi blogi2",
		author: "Perttu",
		url: "www.blog1.eu",
		likes: 24,
		id: "5d8ca875eec2d837788aa8fb"
	},

]
/*
beforeEach(async () => {
	await Blog
})
*/

test('number of notes is three and in json', async () => {
	await api
	  .get('/api/blogs')
	  .expect(200)
	  .expect('Content-Type', /application\/json/)
	  
	  const response = await api.get('/api/blogs')
	  expect(response.body.length).toBe(3)
})

test('blog id attribute name is id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
	mongoose.connection.close()
})


