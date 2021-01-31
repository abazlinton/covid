const express = require('express')
const app = express()
const dates = require('./getDates')

app.get('/dates', (req, res) => {
  res.json(dates)
})

app.listen('8080', ()=>{
  console.log('listening on 8080')
})