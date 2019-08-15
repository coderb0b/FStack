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

const Total = (props) => {
	return (
		<>
		  <p>
			Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
		  </p>	
		</>
	)
}





export default Course