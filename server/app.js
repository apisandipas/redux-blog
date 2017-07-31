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

// Development Error Handler - Prints stack trace 
if (process.env.NODE_ENV === 'development') {
  app.use((err, req, res, next) => {
    err.stack = err.stack || ''
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    }
    res.status(err.status || 500)
    res.json(errorDetails)
  })
}

// production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
})

module.exports = app
