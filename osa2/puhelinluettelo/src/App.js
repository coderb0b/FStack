import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addName = (event) => {
	  event.preventDefault()
	  const personObject = {
		  name: newName,
		  id: persons.length + 1,
		  date: new Date().toISOString(),
	  }
	  
	  if (persons.some(p => p.name === personObject.name)) {
		  alert(`${newName} is already added to phonebook`)
	  } else {
		  setPersons(persons.concat(personObject))
	      setNewName('')
	  }
  }
  
  const handleNameChange = (event) => {
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }
  
  const rows =() => persons.map(person =>
    <Person
      key={person.id}
      person={person}
    />
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
		  value={newName} 
		  onChange={handleNameChange}
		  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
	  {rows()}
    </div>
  )

}

export default App