import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate, clear } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
	const addAnecdote = async (event) => {
	  event.preventDefault()
	  const content = event.target.anecdote.value
	  event.target.anecdote.value = ''
	  const newAnecdote = await anecdoteService.createNew(content)
	  props.createAnecdote(newAnecdote)
	  props.notificationCreate(content)
	  setTimeout(() => {
		  props.clear()
	  }, 5000)
	}
	
	return (
	<div>
	  <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
		    <input name="anecdote"/>
		  </div>
          <button type="submit">create</button>
        </form>
	</div>
	)
}

const mapDispatchToProps = {
	createAnecdote, notificationCreate, clear
}

const ConnectedAnecdoteForm = connect(
	null,
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm