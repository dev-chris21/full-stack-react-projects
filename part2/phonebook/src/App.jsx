import { useState,useEffect } from 'react'
import personService from './services/persons'
import {Filter, Notification, PersonForm, Persons} from './components/components'
import './index.css'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [addedMsg, setAddedMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
    
  
  
  useEffect(() => {
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setSearchQuery(event.target.value)
  }
const filtereData = persons.filter((person)=>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()))
const displayData = searchQuery ? filtereData : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={addedMsg} msgType={'added'}/>
      <Notification msg={errorMsg} msgType={'error'}/>
      <Filter handleFilter={handleFilter}/>
      <PersonForm persons={persons} setPersons={setPersons} setAddedMsg={setAddedMsg} setErrorMsg={setErrorMsg}/>
      <h2>Numbers</h2>
      <Persons displayData={displayData} setPersons={setPersons} persons={persons}/>
    </div>
  )
}




export default App