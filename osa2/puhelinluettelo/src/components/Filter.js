import React from 'react'

const Filter = ({ showPersons, handleShowPersonsChange }) => {
  return (
    <div>
		  filter shown with <input
		  value={showPersons}
		  onChange={handleShowPersonsChange}
		  />
	</div>
  )
}

export default Filter