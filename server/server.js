const express = require('express')
const app = express()
const cors = require('cors')
const dates = require('./getDates')
const getPositiveTests85plus = require('./getPositiveTests85plus')

app.use(cors())

app.get('/dates', (req, res) => {
  res.json(dates)
})

app.get('/85plus', (req, res) => {
  getPositiveTests85plus()
    .then(dates => res.json(dates))
})

app.listen('8080', ()=>{
  console.log('listening on 8080')
})