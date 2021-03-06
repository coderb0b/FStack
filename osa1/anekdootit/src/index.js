import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const min = 0
  const max = anecdotes.length - 1
  const [votes, setVotes] = useState(new Array(max+2).join('0').split('').map(parseFloat))
  
  const vote = () => {
	const copy = [...votes]
	copy[selected] += 1	
	setVotes(copy)
}
  
  
  return (
    <div>
	  <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br />
	  has {votes[selected]} <br />
	  <Button handleClick={() => vote()} text="vote"/>
	  <Button handleClick={() => setSelected(Rand(max, min))} text="next anecdotes"/>
	  <h1>Anecdote with most votes</h1>
	  <Best votes={votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)

const Rand = (max, min) => {
	const number = Math.round(Math.random() * (+max - +min) + +min)
	return number
	
}

const Best = ({ votes, anecdotes }) => {
	
	let max = votes[0]
	let maxIndex = 0
	
	for(var i = 0; i < votes.length; i++) {
		if (votes[i] > max) {
			maxIndex = i
			max = votes[i]
		}
	}

	return (
	<>
	  {anecdotes[maxIndex]} <br />
	  has {votes[maxIndex]} <br />
	</>
	)
}






ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)