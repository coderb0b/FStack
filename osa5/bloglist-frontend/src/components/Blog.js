import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(true)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  //const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        {blog.url} <br />
        <form onSubmit={(event) => likeBlog(event)}>
          {blog.likes} likes {' '}
          <button type="submit">Like</button><br />
        </form>
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
  likeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,

}

export default Blog