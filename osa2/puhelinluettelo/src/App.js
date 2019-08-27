import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons ] = useState('')

  const addName = (event) => {
	  event.preventDefault()
	  const personObject = {
		  name: newName,
		  number: newNumber,
		  date: new Date().toISOString(),
	  }
	  
	  if (persons.some(p => p.name === personObject.name)) {
		  alert(`${newName} is already added to phonebook`)
	  } else {
		  
		  personService
		    .create(personObject)
			.then(response => {
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
			})
	  }
  }
  
  const deletePerson = (id, name) => {
	  if (window.confirm(`Delete ${name} ?`)) {
		personService
		.remove(id)
	  }
  }
  
  const handleNameChange = (event) => {
	  setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
	  setNewNumber(event.target.value)
  }
  
  const handleShowPersonsChange = (event) => {
	  setShowPersons(event.target.value)
  }
  
  const personsToShow = showPersons === ''
    ? persons
	: persons.filter(person => person.name.toLowerCase().includes(showPersons.toLowerCase()))
  
  const rows =() => personsToShow.map(person =>
		<Person
		  key={person.id}
		  name={person.name}
		  number={person.number}
		  deletePerson={(event) => deletePerson(person.id, event, person.name)}
		/>
	)
  
  
  useEffect(() => {
	  personService
	  .getAll()
	  .then(response => {
		  setPersons(response.data)
	  })
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
	    <Filter showPersons={showPersons} handleShowPersonsChange={handleShowPersonsChange} />
	  <h2>add a new</h2>
      <AddPerson addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
	  {rows()}
    </div>
  )

}

export default App