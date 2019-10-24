import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'


const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)
	const [blogs, setBlogs] = useState([])
	const [newBlog, setNewBlog] = useState(null)
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	
	
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
				})

		} catch(exception) {
			setErrorMessage(exception.response.data.error)
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
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
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
