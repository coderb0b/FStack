import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import AddBlog from '../components/AddBlog'
import Togglable from '../components/Togglable'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {
  const addBlogRef = React.createRef()
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={addBlogRef}>
        <AddBlog />
      </Togglable>
      <Table striped>
        <tbody>
          {typeof props.blogs === 'undefined' ?
            <div></div> : props.blogs.sort((a,b) => b.likes - a.likes).map((blog) =>
              <tr key={blog.id}>
                <td>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    user={props.user}
                  />
                </td>
              </tr>
            )}
        </tbody>
      </Table>
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