import blogService from '../services/blogs'

const reducer = (state = [],  action) => {
	switch (action.type) {
		case 'INIT':
		  return action.data
		case 'LIKE':
		  const id = action.data.id
		  const blogToChange = state.data.find(b => b.id === id)
		  const changedBlog = {
			  ...blogToChange,
			  likes: blogToChange.likes + 1
		  }
		  return state.data.map(b =>
		    b.id !== id ? b : changedBlog)
		default: return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT',
			data: blogs
		})
	}
}

export const like = blog => {
	return async dispatch => {
		const changedBlog = {
			...blog,
			likes: blog.likes + 1
		}
		const newLike = await blogService.like(changedBlog)
		dispatch({
			type: 'LIKE',
			data: {
				id: newLike.id
			}
		})
	}
}

export default reducer