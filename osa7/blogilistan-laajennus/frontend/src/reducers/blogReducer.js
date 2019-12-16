import blogService from '../services/blogs'

const reducer = (state = [],  action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.data
  case 'LIKE':
    const id = action.data
    const blogToChange = state.find(b => b.id === id)
    const changedBlog = {
			  ...blogToChange,
			  likes: blogToChange.likes + 1
    }
    return state.map(b =>
      b.id !== id ? b : changedBlog)
  case 'CREATE':
    return state.concat(action.data)
  case 'REMOVE':
    return state.filter(b => b.id !== action.data)
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
      data: newLike.id
    })
  }
}

export const create = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const remove = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog.id
    })
  }
}

export default reducer