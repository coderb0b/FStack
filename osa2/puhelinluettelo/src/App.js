import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'

const App = () => {
  const [ persons, setPersons] = useState([]) 
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
      person={person}
    />
  )
  
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

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