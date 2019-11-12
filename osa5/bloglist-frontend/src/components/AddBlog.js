import React from 'react'
import { useField } from './../hooks'
import blogService from '../services/blogs'

const AddBlog = ({ blogs, setBlogs, message, notify }) => {
	const blogTitle = useField('text')
	const blogAuthor = useField('text')
	const blogUrl = useField('text')
	
	const createBlog = (event) => {
	  event.preventDefault()
	  const blogObject = {
        title: blogTitle.input.value,
        author: blogAuthor.input.value,
        url: blogUrl.input.value,
        likes: 0
      }
	  
	  blogService.create(blogObject).then((response) => {
		  setBlogs(blogs.concat(response.data))
		  blogTitle.reset()
		  blogAuthor.reset()
		  blogUrl.reset()
		  notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
	  }).catch((error) => {
		  console.log("set message error")
	  })
  }
  
  
	
  return (
    <form onSubmit={createBlog}>
      <div>
                title: <input {...blogTitle.input} />
      </div>
      <div>
                author: <input {...blogAuthor.input} />
      </div>
      <div>
                url: <input {...blogUrl.input} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}
export default AddBlog