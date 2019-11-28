import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'


const App = (props) => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const addBlogRef = React.createRef()
  const username = useField('text')
  const password = useField('password')



  useEffect(() => {
    if (user) {
	  blogService
      .getAll()
      .then((response) => {
		  setBlogs(response.data || [])
	  }).catch((error) => {
		  setMessage('Wrong credentials')
		  setMessageType('error')
	  })
	  
	  
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  
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

  const likeBlog = (id, event) => {
    try {
      event.preventDefault()
      const blog = blogs.find(b => b.id === id)

      const newLikes = blog.likes + 1
      const changedBlog = { ...blog, likes: newLikes }
      blogService
        .update(id, changedBlog)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b.id === returnedBlog.id ? changedBlog : b))
        })

    } catch (exception) {
      setMessage(exception.response.data.error)
      setMessageType('error')
    }

  }

  const deleteBlog = (id, title, event) => {
    event.preventDefault()
    if (window.confirm(`Remove ${title}?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
    }
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
      <Notification message={message} className={messageType} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={addBlogRef}>
            <AddBlog store={props.store} blogs={blogs} setBlogs={setBlogs} notify={notify} />
          </Togglable>
          {blogs.sort((a,b) => b.likes - a.likes).map((blog) => {
			  return (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={(event) => likeBlog(blog.id, event)}
              deleteBlog={(event) => deleteBlog(blog.id, blog.title, event)}
              user={user}
            />)
          })}
        </div>}
    </div>
  )


}

export default App
