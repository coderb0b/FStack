import React from 'react'

const Person = ({ name, number, deletePerson }) => {
  return (
    <>{name} {number} 
	  <form onSubmit={deletePerson}>
	    <button type="submit">poisto</button>
	  </form>
	</>
  )
}

export default Person