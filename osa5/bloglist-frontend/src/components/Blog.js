import React, { useState } from 'react'


const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(true)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }
	
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
		{blog.likes} likes <button type="button">Like</button><br />
		added by {blog.user.username}
	 </div>
  </div>
)}

export default Blog