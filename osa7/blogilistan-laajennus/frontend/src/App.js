import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import { loginUser, logoutUser } from './reducers/userReducer'

const App = (props) => {
  const addBlogRef = React.createRef()

  useEffect(() => {
    if (props.user) {
	  props.initializeBlogs()
    } else {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON)
      props.loginUser(user)
		  blogService.setToken(user.token)
      }

    }
  }, [props.user])

  function handleLogout(event) {
    event.preventDefault()
    window.localStorage.clear()
    props.logoutUser()
  }

  

  return (
    <div>
      <Notification />
      {props.user === null ?
        <LoginForm /> :
        <div>
          <h2>blogs</h2>
              <p>{props.user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={addBlogRef}>
            <AddBlog />
          </Togglable>
	  <BlogList user={props.user} />
        </div>}
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}


export default connect(mapStateToProps, { initializeBlogs, setNotification, loginUser, logoutUser })(App)



