import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: '040-123456' },
    { name: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
    { name: 'Dan Abramov', id: 3, number: '12-43-234345' },
    { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons ] = useState('')
  
  const addName = (event) => {
	  event.preventDefault()
	  const personObject = {
		  name: newName,
		  id: persons.length + 1,
		  number: newNumber,
		  date: new Date().toISOString(),
	  }
	  
	  if (persons.some(p => p.name === personObject.name)) {
		  alert(`${newName} is already added to phonebook`)
	  } else {
		  setPersons(persons.concat(personObject))
	      setNewName('')
		  setNewNumber('')
	  }
  }
  
  const handleNameChange = (event) => {
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
	  console.log(event.target.value)
	  setNewNumber(event.target.value)
  }
  
  const handleShowPersonsChange = (event) => {
	  console.log(event.target.value)
	  setShowPersons(event.target.value)
  }
  
  const personsToShow = showPersons === ''
    ? persons
	: persons.filter(person => person.name.toLowerCase().includes(showPersons.toLowerCase()))
  
  const rows =() => personsToShow.map(person =>
    <Person
      key={person.id}
      person={person}
    />
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
	    <div>
		  filter shown with <input
		  value={showPersons}
		  onChange={handleShowPersonsChange}
		  />
		</div>
	  <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
		  value={newName} 
		  onChange={handleNameChange}
		  />
        </div>
		<div>
          number: <input 
		  value={newNumber} 
		  onChange={handleNumberChange}
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