import React from 'react'
import { connect } from 'react-redux'
import { useField } from './../hooks'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const AddBlog = (props) => {
	const blogTitle = useField('text')
	const blogAuthor = useField('text')
	const blogUrl = useField('text')
	
	console.log("pppppppppppppp", props.store.dispatch(setNotification))  
	
	const createBlog = (event) => {
	  event.preventDefault()
	  const blogObject = {
        title: blogTitle.input.value,
        author: blogAuthor.input.value,
        url: blogUrl.input.value,
        likes: 0
      }
	  
	  blogService.create(blogObject).then((response) => {
		  props.setBlogs(props.blogs.concat(response.data))
		  blogTitle.reset()
		  blogAuthor.reset()
		  blogUrl.reset()
		  props.notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
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