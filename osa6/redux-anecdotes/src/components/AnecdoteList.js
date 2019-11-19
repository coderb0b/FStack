import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notificationVote } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	const anecdotes = props.store.getState().anecdote
	
	return (
	<div>
	  {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
              {props.store.dispatch(vote(anecdote.id)); 
              props.store.dispatch(notificationVote(anecdote))}}>vote</button>
          </div>
        </div>
	  )}
	</div>
	)
}

export default AnecdoteList