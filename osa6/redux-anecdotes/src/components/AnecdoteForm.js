import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate, clear } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
	const addAnecdote = (event) => {
	  event.preventDefault()
	  const content = event.target.anecdote.value
	  event.target.anecdote.value = ''
	  props.createAnecdote(content)
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

const mapStateToProps = (state) => {
	return {
		anecdote: state.anecdote,
		notification: state.notification
	}
}

const mapDispatchToProps = {
	createAnecdote, notificationCreate, clear
}

const ConnectedAnecdoteForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm