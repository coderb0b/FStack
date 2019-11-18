import React from 'react'
import { vote } from './reducers/anecdoteReducer'
import { createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()


  
	const addAnecdote = (event) => {
	  event.preventDefault()
	  const content = event.target.anecdote.value
	  event.target.anecdote.value = ''
	  props.store.dispatch(createAnecdote(content))
	}
  
  


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.store.dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
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

export default App