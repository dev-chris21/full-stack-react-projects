require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


morgan.token('req-body', (req) => {
  return JSON.stringify(req.body) || '{}'
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :req-body'))


app.get('/', (req, res) => {
    res.send('<h1>Hello World! am coming!</h1>')
  })

app.get('/persons', (req,res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get('/info', async (req,res) => {
    const requestTime = new Date().toString()
    const total = await Person.countDocuments({})
    res.send(`<p>Phonebook has info for ${total} people</p>
        <p>${requestTime}</p>`)
})
  
app.get('/persons/:id', (req,res,next) => {
    Person.findById(req.params.id).then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})
  
app.delete('/persons/:id', (req,res) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
})


app.post('/persons', (req, res) => {
   
    const {name, number} = req.body
  
    if (!name && !number) {
      return res.status(400).json({ 
        error: 'No name & number missing' 
      })
    }

    const person = new Person({
      name: name,
      number: number,
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
  })

  const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(errorHandler)
  
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })