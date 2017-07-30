const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })
}

app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
})

module.exports = app
