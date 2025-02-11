const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


morgan.token('req-body', (req) => {
  return JSON.stringify(req.body) || '{}'
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :req-body'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/persons', (req,res) => {
    res.json(persons)
})

app.get('/info', (req,res) => {
    const requestTime = new Date().toString()
    const total = persons.length
    res.send(`<p>Phonebook has info for ${total} people</p>
        <p>${requestTime}</p>`)
})
  
app.get('/persons/:id', (req,res) => {
    const id = req.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/persons/:id', (req,res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

  
  function randomId() {
    return Math.floor(Math.random()*1000)
  } 

app.post('/persons', (req, res) => {
   
    let p = req.body
  
    if (!p.name && !p.number) {
      return res.status(400).json({ 
        error: 'No name & number missing' 
      })
    } else if(persons.some(person => person.name === p.name )){
        return res.status(400).json({error:"name must be unique"})
    }

    let id = randomId()
    p.id = id
    persons = persons.concat(p)
  
    res.json(p)
  })
  
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })