import { useState,useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [formValues, setNewFormValues] = useState({name:'',number:''})
  const [searchQuery, setSearchQuery] = useState('')
  const [addedMsg, setAddedMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {

      event.preventDefault()

      const name = formValues.name
      const number = formValues.number
      const existingName = persons.find(person => person.name === name)
      const existingNumber = persons.find(person => person.number === number)


      if(existingName && !existingNumber){
        const nameToFind = name
        const perObject = persons.find(p=>p.name === nameToFind)
        const id = perObject.id
        console.log(id)
        const patch = {
          name: name,
          number: number,
          importance: Math.random() < 0.5,
        }
        personService
        .update(id, patch)
        .then(response => {
          setPersons(persons.map(person => person.id === id ? response.data : person))
        })
        .catch(
          setErrorMsg(
            `information of '${patch.name}' has been removed from server`
          ),
          setTimeout(() => {
            setAddedMsg(null)
          }, 5000)
        )
      }


      else if(existingName && existingNumber){
        return `${name} has already been added`
      }


      else{
      const personObject = {
        name: name,
        number: number,
        important: Math.random() < 0.5,
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      .then(
        setAddedMsg(
          `Added '${personObject.name}'`
        ),
        setTimeout(() => {
          setAddedMsg(null)
        }, 5000)
      )
    }
      
 }
  
  const handleChange = (e) => {
    setNewFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = (id, name) => {
    const isComfirmed = window.confirm(`Are you sure you want to delete${name}`)
    if(isComfirmed){
      personService
      .remove(id)
      .then(()=>{
        setPersons(persons.filter(person=>person.id !== id))
      })
    } else {
      console.log('deletion canceled.')
    }
  }

  const handleFilter = (event) => {
    setSearchQuery(event.target.value)
  }

  const filtereData = persons.filter((person)=>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const displayData = searchQuery ? filtereData : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification addedMsg={addedMsg}/>
      <Enotification errorMsg={errorMsg}/>
      <Filter handleFilter={handleFilter}/>
      <PersonForm handleChange={handleChange} formValues={formValues} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons displayData={displayData} handleDelete={handleDelete}/>
    </div>
  )
}


const Filter = ({handleFilter}) => {
  return (
      <div>
        filter shown with <input name='filter' onChange={handleFilter} />
      </div>
  )
}
const PersonForm = ({handleChange, formValues, addPerson}) => {
  return (
      <div>
        <form>
        <h2>Add new</h2>
        <div style={{display:'flex', flexDirection:'column', width:'250px'}}>
          name: <input  name='name' value={formValues.name} onChange={handleChange} />
          number:<input name='number' value={formValues.number} onChange={handleChange} />
        </div>
        <div>
          <button onClick={addPerson}>add</button>
        </div>
      </form>
      </div>
  )
}
const Persons = ({displayData, handleDelete}) => {
  return (
      <div>
        <ul style={{listStyleType:'none', paddingLeft:'0', marginLeft:'0'}}>
        {displayData.map( d => 
        <li key={d.id}>{d.name} {d.number}
        <button onClick={()=>handleDelete(d.id, d.name)}>Delete</button>
        </li>
        )}
      </ul>
      </div>
  )
}

const Notification = ({addedMsg}) => {
  if(addedMsg==null){
    return null
  }
  return (
    <div className='added'>
      {addedMsg}
    </div>
  )
}

const Enotification = ({errorMsg}) => {
  if(errorMsg==null){
    return null
  }
  return(
    <div className='error'>
      {errorMsg}
    </div>
  )
}

export default App