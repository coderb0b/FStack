const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_FILTER':
		//console.log("ppppppppppppppp", action.filter)
		  return action.filter
		default:
		  return state
	}
}

export const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		filter
	}
}

export default filterReducer