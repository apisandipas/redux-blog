const mongoose = require('mongoose')

/* global before, beforeEach */

before((done) => {
  mongoose.connect('mongodb://localhost/blog_test', { useMongoClient: true })
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err)
    })
})

beforeEach((done) => {
  const { posts } = mongoose.connection.collections
  posts.drop()
    // .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done())
})