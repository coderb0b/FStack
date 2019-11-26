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

export const vote = anecdote => {
	return async dispatch => {
		const changedAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1
		}
		const newVote = await anecdoteService.vote(changedAnecdote)
		dispatch({
			type: 'VOTE',
			data: {
				id: newVote.id
			}
		})
	}
}

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