import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ showCountries, setShowCountries ] = useState('')
  
  
  const handleShowCountriesChange = (event) => {
	  setShowCountries(event.target.value)
  }
  
  const handleButtonShowCountry = (event) => {
	  setShowCountries(event.target.attributes.country.value)
  }
  
  const countriesToShow = showCountries === ''
    ? []
	: countries.filter(country => country.name.toLowerCase().includes(showCountries.toLowerCase()))

  const rows =() => {
    if (countriesToShow.length > 10) {
      return (
        <>Too many matches, specify another filter</>
      )
    } else if (countriesToShow.length === 1) {
      return (
        countriesToShow.map(country =>
          <Country
            key={country.name}
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flag={country.flag}
          />
        )
      )
    } else {
      return (
        countriesToShow.map(country =>
          <Country
            key={country.name}
            name={country.name}
			handleButton={handleButtonShowCountry}
          />
        )
      )
    }
  } 
  
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  


  return (
    <div>
	    <Filter showCountries={showCountries} handleShowCountriesChange={handleShowCountriesChange} />
	    {rows()}
    </div>
  )

}

export default App