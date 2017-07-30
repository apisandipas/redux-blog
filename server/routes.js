const MainController = require('./controllers/MainController')
const PostsController = require('./controllers/PostsController')

const Router = (app)  => {
  app.get('/', MainController.index)

  app.get('/api/posts', PostsController.index)
  app.post('/api/posts', PostsController.create)
  app.get('/api/posts/:id', PostsController.read)
  app.put('/api/posts/:id', PostsController.update)
  app.delete('/api/posts/:id', PostsController.delete)
}

module.exports = Router
