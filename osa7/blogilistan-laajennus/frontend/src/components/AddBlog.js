import React from 'react'
import { connect } from 'react-redux'
import { useField } from './../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { create } from '../reducers/blogReducer'

const AddBlog = (props) => {
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')

  const createBlog = async event => {
	  event.preventDefault()
	  const blogObject = {
      title: blogTitle.input.value,
      author: blogAuthor.input.value,
      url: blogUrl.input.value,
      likes: 0
    }

    try {
      props.create(blogObject)
      props.setNotification(`'${blogObject.title}' was created`, 3)
      blogTitle.reset()
	    blogAuthor.reset()
	    blogUrl.reset()
    } catch (error) {
      props.setNotification('error message', 3)
    }
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification, create
}

const ConnectedAddBlog = connect(mapStateToProps, mapDispatchToProps)(AddBlog)
export default ConnectedAddBlog