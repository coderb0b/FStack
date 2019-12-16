import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { like, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [visible, setVisible] = useState(true)
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const blog = props.blog
  const user = props.user

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {
    try {
      await props.like(blog)
      await props.setNotification(`You liked '${blog.title}' blog`, 3)
    } catch (error) {
      await props.setNotification('error message', 3)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        await props.remove(blog)
        await props.setNotification(`'${blog.title}' blog was deleted`, 3)
      } catch (error) {
        await props.setNotification('error message', 3)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} className="clickable">
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible} className="togglableContent">
        {blog.url} <br />

        {blog.likes} likes {' '}
        <button onClick={likeBlog}>Like</button><br />

		added by {blog.user.name}
        {
          (user.username === blog.user.username) && <button onClick={deleteBlog}>Remove</button>
        }
      </div>
    </div>
  )}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  like, setNotification, remove
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs.data
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)
