const passport = require('passport')
const passportService = require('./services/passport')
const MainController = require('./controllers/MainController')
const PostsController = require('./controllers/PostsController')
const AuthController = require('./controllers/AuthController')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

const Router = (app)  => {
  app.get('/', MainController.index)

  app.get('/api/posts', PostsController.index)
  app.get('/api/posts/:id', PostsController.read)
  app.post('/api/posts', PostsController.create)
  app.put('/api/posts/:id', PostsController.update)
  app.delete('/api/posts/:id', PostsController.delete)

  app.get('/api/secret', requireAuth, function (req, res, next) {
    res.send({ message: 'Super secret code is ABC123' })
  })
  app.post('/signin', requireSignin, AuthController.signin)
  app.post('/signup', AuthController.signup)
}

module.exports = Router
