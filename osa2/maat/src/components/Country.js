import React from 'react'
import Weather from './Weather'


const Country = ({ name, capital, population, languages, flag, handleButton }) => {

  if (population == null) {
    
    return (
      <div>
        <>{name} <button onClick={handleButton} country={name}>show</button></>
      </div>
    )
  }
    return (
      <div>
        <h2>{name}</h2>
          <>capital {capital}</><br />
          <>population {population}</>
        <h3>languages</h3>
        <ul>
          {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={flag} alt="flag" height="120" width="190"/>
		<h2>Weather in {capital}</h2>
		<Weather capital={capital} />
      </div>
    )
}

export default Country