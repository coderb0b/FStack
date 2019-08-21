import React from 'react'

const Country = ({ name, capital, population, languages, flag }) => {

  if (population == null) {
    
    return (
      <div>
        <>{name}</>
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
        <img
          src={flag} alt="flag" height="120" width="190"
        />
      </div>
    )
}

export default Country