import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
	case 'VOTE':
	const id = action.data.id
	const anecdoteToChange = state.find(a => a.id === id)
	const changedAnecdote = {
		...anecdoteToChange,
		votes: anecdoteToChange.votes + 1
	}
      return state.map(a => 
	    a.id !== id ? a : changedAnecdote)
    case 'NEW':
      return [...state, action.data]
	case 'INIT':
	  return action.data
    default: return state	  
  }

  
}

export const vote = (id) => {
    console.log('vote', id)
	return {
		type: 'VOTE',
		data: {
		  id: id
		}
	}
  }
/*  
export const createAnecdote = (data) => {
	  return {
		  type: 'NEW',
		  data,
	  }
  }
*/

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'NEW',
			data: newAnecdote,
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT',
		    data: anecdotes
		})
	}
}

export default reducer