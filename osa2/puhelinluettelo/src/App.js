import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons ] = useState('')
  const [ newMessage, setNewMessage ] = useState(null)

  const addName = (event) => {
	  event.preventDefault()
	  const personObject = {
		  name: newName,
		  number: newNumber,
		  date: new Date().toISOString(),
	  }
	  
	  const person = persons.find(p => p.name === personObject.name)
	  
	  if (typeof person !== "undefined") {
		  if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
			  const changedPersonNumber = { ...person, number: personObject.number }
			  personService
			    .update(person.id, changedPersonNumber)
				.then(response => {
				setPersons(persons.map(p => p.id !== person.id ? p : response.data))
				setNewMessage(`Changed number for ${person.name}`)
				setTimeout(() => {
					setNewMessage(null)
				}, 2000)
				setNewName('')
				setNewNumber('')
				})
				.catch(error => {
					const virhe = "virhe"
					setNewMessage(`Information of ${person.name} has been removed from server`, virhe)
				})
		  }
	  } else {
		  
		  personService
		    .create(personObject)
			.then(response => {
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
				setNewMessage(`Added ${personObject.name}`)
				setTimeout(() => {
					setNewMessage(null)
				}, 2000)
			})
	  }
  }
  
  const deletePerson = (id, event, name) => {
	  event.preventDefault()
	  if (window.confirm(`Delete ${name} ?`)) {
		personService
		  .remove(id)
		  .then(() => {
			setPersons(persons.filter(p => p.id !== id))
			setNewMessage(`Deleted ${name}`)
		  })
		  setTimeout(() => {
			setNewMessage(null)
		}, 2000)
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
	    <Notification message={newMessage} />
	    <Filter showPersons={showPersons} handleShowPersonsChange={handleShowPersonsChange} />
	  <h2>add a new</h2>
        <AddPerson addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
	    {rows()}
    </div>
  )

}

export default App