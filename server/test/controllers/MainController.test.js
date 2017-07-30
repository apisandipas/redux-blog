const assert = require('assert')
const request = require('supertest')
const app = require('../../app')

describe('Main Controller', () => {
  it('GET to / returns as expected', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        assert(res.body.Hello === 'World')
        done()
      })
  })

})