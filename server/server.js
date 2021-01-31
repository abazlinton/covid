const express = require('express')
const app = express()
const cors = require('cors')
const dates = require('./getDates')

app.use(cors())

app.get('/dates', (req, res) => {
  res.json(dates)
})

app.listen('8080', ()=>{
  console.log('listening on 8080')
})