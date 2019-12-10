import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { like } from '../reducers/blogReducer'

//{ blog, deleteBlog, user }

const Blog = (props) => {
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
      <div onClick={toggleVisibility} className="clickable">
        {props.blog.title} {props.blog.author}
      </div>
      <div style={hideWhenVisible} className="togglableContent">
        {props.blog.url} <br />
        
          {props.blog.likes} likes {' '}
          <button onClick={() => {props.like(blog)}}>Like</button><br />
        
		added by {propsblog.user.name}
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

//export default Blog

const mapDispatchToProps = {
	like
}

const mapStateToProps = (state) => {
	return{
		blogs: state.blogs.data
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)