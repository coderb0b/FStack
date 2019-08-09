import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  
  

  return (
    <div>
        <div>
          <h1>Give Feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
        </div>
		<h1>Statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Statistics = (props) => {
	const all = props.good + props.neutral + props.bad
    const avg = (props.good - props.bad )/all
    const pos = props.good / all
	
	if (all === 0) {
		return (
		  <div>No feedback given</div>
		)
		
	}
		
	return (
	  <div>
        <p>good {props.good}<br />
		neutral {props.neutral}<br />
		bad {props.bad}<br />
		all {all}<br />
		average {avg}<br />
		positive {pos}</p>
      </div>
	)
}





ReactDOM.render(<App />, 
  document.getElementById('root')
)