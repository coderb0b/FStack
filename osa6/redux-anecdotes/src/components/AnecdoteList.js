import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationVote, clear } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	const anecdotesToShow = () => {
		if (props.filter === '') {
			return props.anecdotes
		}
		return props.anecdotes.filter(a => a.content.includes(props.filter))
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
              {props.vote(anecdote.id);
              props.notificationVote(anecdote);
              setTimeout(() => {
                props.clear()
              }, 5000)}}>vote</button>
          </div>
        </div>
	  )}
	</div>
	)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote, notificationVote, clear
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList