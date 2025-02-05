import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [formValues, setNewFormValues] = useState({name:'',number:''})
  const [searchQuery, setSearchQuery] = useState('')


  const addPerson = (event) => {
      event.preventDefault()
      const name = formValues.name
      const number = formValues.number
      const existingName = persons.find(person => person.name === name)
      if(existingName){
        alert(`${name} is already added to phonebook`)
      }else{
      const personObject = {
        name: name,
        number: number,
        important: Math.random() < 0.5,
        id: String(persons.length + 1)
      }
      setPersons([...persons, personObject])
    }
      
 }
  
  const handleChange = (e) => {
    setNewFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
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
      <Filter handleFilter={handleFilter}/>
      <PersonForm handleChange={handleChange} formValues={formValues} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons displayData={displayData}/>
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
const Persons = ({displayData}) => {
  return (
      <div>
        <ul style={{listStyleType:'none', paddingLeft:'0', marginLeft:'0'}}>
        {displayData.map((d) => 
        <li key={d.id}>{d.name} {d.number}</li>
        )}
      </ul>
      </div>
  )
}

export default App