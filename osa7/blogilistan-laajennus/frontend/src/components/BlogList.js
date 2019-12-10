import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import { like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {
  const deleteBlog = (id, title, event) => {
    event.preventDefault()
    if (window.confirm(`Remove ${title}?`)) {
      blogService
        .remove(id)
        .then(() => {
          //setBlogs(props.blogs.filter(b => b.id !== id))
        })
    }
  }
/*  
  const likeBlog = (id, event) => {
    try {
      event.preventDefault()
      const blog = props.blogs.find(b => b.id === id)
      props.like(id)
  
    } catch (exception) {
      //setMessage(exception.response.data.error)
      //setMessageType('error')
    }
  }
*/

  


  return (
    <div>
	  {typeof props.blogs === 'undefined' ?
		  <div></div> : props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => {
			  return (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={(event) => deleteBlog(blog.id, blog.title, event)}
              user={props.user}
            />)
        })}
    </div>
  )

}




const mapStateToProps = (state) => {
  return{
    blogs: state.blogs.data
  }
}

const mapDispatchToProps = {
  like, setNotification
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogList)