import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [visible, setVisible] = useState(true)
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const blog = props.blog
  const deleteBlog = props.deleteBlog
  const user = props.user

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {
    //event.preventDefault()
    try {
      await props.like(blog)
      await props.setNotification(`You liked '${blog.title} blog`, 3)
    } catch (error) {
      await props.setNotification('error message', 3)
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
          (user.username === blog.user.username) && <form onSubmit={(event) => deleteBlog(event)}>
            <button type="submit">Remove</button>
          </form>
        }
      </div>
    </div>
  )}

Blog.propTypes = {
  user: PropTypes.object,
  deleteBlog: PropTypes.func.isRequired,
  //likeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,

}

//export default connect(null, { like, setNotification })(Blog)

//export default Blog


const mapDispatchToProps = {
  like, setNotification
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)
