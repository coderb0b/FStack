import React from 'react'

const Course = (props) => {
	
	return (
	  <>
		<Header course={props.course.name}/>
	    <Content parts={props.course.parts}/>
	    <Total parts={props.course.parts}/>
	  </>
	
	)
}

const Header = (props) => {
	
	return (
		<>
		  <h1>
			{props.course}
		  </h1>	
		</>
	)
}

const Content = (props) => {
	
	return (
		<>
		  {rows(props)}
		</>
	)
}

  const rows = ({ parts }) => parts.map(part =>
    <Part
	  key={part.id}
	  part={part}
	/>
  )


const Part = ({ part }) => {
	
	return (
		<>
		  <p>
			{part.name} {part.exercises}
		  </p>	
		</>
	)
}

const Total = ({ parts }) => {
	const totalAmount = parts.reduce( (sum, part) => {
		return sum + part.exercises
	}, 0)
	
	return (
		<>
		  <p>
			<b>total of {totalAmount} exercises</b>
		  </p>	
		</>
	)
}





export default Course