import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [blogs, setBlogs] = useState([])
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [message, setMessage] = useState(null)
	const [messageType, setMessageType] = useState(null)

	
	
	useEffect(() => {
		blogService
		.getAll()
		.then(b => setBlogs(b))
	}, [])
	
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])
	
	
	const loginForm = () => (
	<div>
	 <h2>Log in to application</h2>
	   <form onSubmit={handleLogin}>
          <div>
		    username
			  <input
			  type="text"
			  value={username}
			  name="Username"
			  onChange={({ target }) => setUsername(target.value)}
			 />
		  </div>
		  <div>
		    password
			  <input
			  type="password"
			  value={password}
			  name="Password"
			  onChange={({ target }) => setPassword(target.value)}
			 />
		  </div>
		  <button type="submit">login</button>
        </form>
	</div>
	)

	const addBlog = async (event) => {
		try {
			event.preventDefault()
			const blogObject = {
				title: newTitle,
				author: newAuthor,
				url: newUrl
			}
	
			await blogService
			  .create(blogObject)
				.then(data => {
					setBlogs(blogs.concat(data))
					setNewTitle('')
					setNewAuthor('')
					setNewUrl('')
					setMessage(`a new blog ${newTitle} by ${newAuthor} added`)
					setMessageType('success')
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				})

		} catch(exception) {
			setMessage(exception.response.data.error)
			setMessageType('error')
		}
	}

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}
	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value)
	}
	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}
	
	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			
			window.localStorage.setItem(
			  'loggedUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setMessage(`${user.name} logged in`)
			setMessageType('success')
			setTimeout(() => {
				setMessage(null)
				setMessageType(null)
			}, 5000)
		} catch (exception) {
			setMessage('wrong credentials')
			setMessageType('error')
			setTimeout(() => {
				setMessage(null)
				setMessageType(null)
			}, 5000)
		}
	}
	
	function handleLogout(event) {
		event.preventDefault()
		window.localStorage.clear()
		setUser(null)
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
		  <AddBlog addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
		  {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
		</div>}
    </div>
	)
	

}

export default App;
