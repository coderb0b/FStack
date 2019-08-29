import React from 'react'

const Person = ({ name, number, deletePerson }) => {
  return (
  <>
    <form onSubmit={(event) => deletePerson(event)}>
      {name} {number} {` `}
		  <button type="submit">delete</button><br/>
    </form>
	</>
  )
}

export default Person