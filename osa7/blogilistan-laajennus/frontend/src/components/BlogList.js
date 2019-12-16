import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {
  return (
    <div>
      {typeof props.blogs === 'undefined' ?
        <div></div> : props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              user={props.user}
            />)
        })}
    </div>
  )

}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  like, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)