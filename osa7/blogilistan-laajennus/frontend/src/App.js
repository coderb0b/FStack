import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import loginService from './services/login'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { useField } from './hooks'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'



const App = (props) => {
  const [user, setUser] = useState(null)
  const [setMessage] = useState(null)
  const [setMessageType] = useState(null)
  const addBlogRef = React.createRef()
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    if (user) {
	  props.initializeBlogs()
    } else {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON)
        setUser(user)
		  blogService.setToken(user.token)
      }

    }
  }, [user])

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
		username
          <input {...username.input} />
        </div>
        <div>
		password
          <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  

  const handleLogin = (event) => {
    event.preventDefault()

    loginService.login(username.input.value, password.input.value).then((response) => {
		  if(response.data) {
			  const user = {
				  username: response.data.username,
				  name: response.data.name,
				  token: response.data.token
			  }

			  window.localStorage.setItem('loggedUser', JSON.stringify(user))

			  blogService.setToken(user.token)
        setUser(user)
        username.reset()
        password.reset()
        setMessage(`${user.name} logged in`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
		    }
	    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        setMessage('wrong credentials')
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
				  username.reset()
				  password.reset()            
        }, 5000)
      }
    })
  }

  function handleLogout(event) {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const notify = (message, messageType) => {
	  setMessage(message)
	  setMessageType(messageType)
	  setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  return (
    <div>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={addBlogRef}>
            <AddBlog />
          </Togglable>
	  <BlogList user={user} />
        </div>}
    </div>
  )


}


export default connect(null, { initializeBlogs })(App)



