import React, { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'

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