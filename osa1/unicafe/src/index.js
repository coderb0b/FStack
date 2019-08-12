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
            <Button handleClick={() => setGood(good + 1)} text="good"/>
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
			<Button handleClick={() => setBad(bad + 1)} text="bad"/>
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
	  <>
		<table>
		 <tbody>
		  <tr>
			<td><Statistic text="good" value ={props.good} /></td>
		  </tr>
          <tr>		  
			<td><Statistic text="neutral" value ={props.neutral} /></td>
		  </tr>
		  <tr>
			<td><Statistic text="bad" value ={props.bad} /></td>
		  </tr>
		  <tr>
			<td><Statistic text="all" value ={all} /></td>
		  </tr>
		  <tr>
			<td><Statistic text="average" value ={avg} /></td>
		  </tr>
		  <tr>
			<td><Statistic text="positive" value ={pos}  /></td>
		  </tr>
		 </tbody>
		</table>
      </>
	)
}

const Statistic = (props) => {
	if (props.text==="positive") {
		return (
	<>
	  {props.text} {props.value} %<br />
	</>
	)
		
	}
	return (
	<>
	  {props.text} {props.value}<br />
	</>
	)
}


const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)



ReactDOM.render(<App />, 
  document.getElementById('root')
)