const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const Post = mongoose.model('post')

const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora totam, a amet, labore soluta adipisci culpa animi dignissimos perferendis at minus, expedita nobis incidunt quidem! Facilis iste obcaecati quo suscipit.'

describe('Posts Controller', () => {

  it('GET to /api/posts get a list of posts', (done) => {
    const post0 = new Post({ title: 'Test Title 0', content })
    const post1 = new Post({ title: 'Test Title 1', content })
    const post2 = new Post({ title: 'Test Title 2', content })
    const post3 = new Post({ title: 'Test Title 3', content })

    Promise.all([post0.save(), post1.save(), post2.save(), post3.save()])
      .then((response) => {
        request(app)
          .get(`/api/posts`)
          .end((err, res) => {
            assert(res.body.length === 4)
            assert(res.body[0].title === 'Test Title 0')
            done()
          })
      })
  })

  it('GET to /api/posts/:id fetches a single post', (done) => {
    const post = new Post({ title: 'Test Title 0', content })
    post.save(() => {
      request(app)
        .get(`/api/posts/${post._id}`)
        .end((err, res) => {
          assert(post._id.toString() === res.body._id.toString())
          done()
        })
    })
  })

  xit('POST to /api/posts creates a new post', (done)  => {
    Post.count().then((beforeCount) => {
      request(app)
        .post('/api/posts')
        .send({title: 'Test Title 1', content })
        .end((err, res) => {
          Post.count().then((newCount) => {
            assert(beforeCount + 1 === newCount)
            done()
          })
        })
    })
  })

  xit('PUT to /api/posts/:id edit an existing post', (done) => {
    const post = new Post({ title: 'Test Title 2', content })

    post.save().then(() => {
      request(app)
        .put(`/api/posts/${post._id}`)
        .send({ title: 'Updated Title' })
        .end(() => {
          Post.findOne({ title: 'Updated Title' })
            .then(post => {
              assert(post.title === 'Updated Title')
              done()
            })
        })
    })
  })

  xit('DELETE to /api/posts/:id removes an existing post', (done) => {
    const post = new Post({ title: 'Test Title 3', content })

    post.save().then(() => {
      request(app)
        .delete(`/api/posts/${post._id}`)
        .end(() => {
          Post.findOne({title: 'Test Title 3'})
            .then(post => {
              assert(post === null)
              done()
            })
        })
    })
  })

})