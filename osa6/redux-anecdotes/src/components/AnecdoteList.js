import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notificationVote, clear } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	const anecdotes = props.store.getState().anecdote
	const filter = props.store.getState().filter
	
	const anecdotesToShow = () => {
		if (filter === '') {
			return anecdotes
		}
		return anecdotes.filter(a => a.content.includes(filter))
	}
	
	return (
	<div>
	  {anecdotesToShow().sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
              {props.store.dispatch(vote(anecdote.id)); 
              props.store.dispatch(notificationVote(anecdote));
              setTimeout(() => {
                props.store.dispatch(clear())
              }, 5000)}}>vote</button>
          </div>
        </div>
	  )}
	</div>
	)
}

export default AnecdoteList