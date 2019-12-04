import blogService from '../services/blogs'

const reducer = (state = [],  action) => {
	switch (action.type) {
		case 'INIT':
		console.log("pppppppppppppppppppppppppp", action.data)
		  return action.data
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

export default reducer