import React from 'react'

const Filter = ({ showCountries, handleShowCountriesChange }) => {
  return (
    <div>
		  find countries <input
		  value={showCountries}
		  onChange={handleShowCountriesChange}
		  />
	</div>
  )
}

export default Filter