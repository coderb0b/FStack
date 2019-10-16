/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})


test('number of blogs is three and in json', async () => {
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

test('blog can be added', async () => {
  const newBlog = {
    title: 'Manun blogi',
    author: 'Manu',
    url: 'www.manulleillallinen.fi',
    likes: 43,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(title).toContain('Manun blogi')
})

test('blog with likes without a value, set likes to zero', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'Manu',
    url: 'www.manulleillallinen.fi',
    likes: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body[response.body.length - 1].likes

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(likes).toBe(0)
})

test('blog with no title or url fields is not created', async () => {
  const newBlog = {
    author: 'Manu'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blog is deleted', async () => {
  const blogsBeforeDelete = await helper.blogsInDb()
  const blogToDelete = blogsBeforeDelete[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDb()
  const contents = blogsAfterDelete.map(r => r.title)
  expect(contents).not.toContain(blogToDelete.title)
})

test('number of likes can be edited', async () => {
  const blogsBeforeEdit = await helper.blogsInDb()
  const blogToEdit = blogsBeforeEdit[0]

  const newBlog = {
    likes: 2
  }

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(newBlog)
    .expect(200)

  const blogsAfterEdit = await helper.blogsInDb()
  expect(blogsAfterEdit[0].likes).toBe(newBlog.likes)
})


afterAll(() => {
  mongoose.connection.close()
})


