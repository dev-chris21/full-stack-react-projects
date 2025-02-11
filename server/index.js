const express = require('express')
const app = express()


app.get('/', (req,res)=>{
    res.send('<h1>MANAWARE!</H1>')
})


const PORT = 3003
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})