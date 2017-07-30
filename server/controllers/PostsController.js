const Post = require('../models/post')

class PostsController {
  
  index (req, res, next) {
    Post.find({})
      .then((response) => res.send(response))
      .catch(next)
  }

  create (req, res, next) {
    const postProps = req.body
    Post.create(postProps)
     .then((post) => res.send(post))
     .catch(next)
  }

  read (req, res, next) {
    const { id } = req.params

    Post.findOne({ _id: id })
      .then((post) => res.send(post))
      .catch(next)
  }

  update (req, res, next) {
    const { id } = req.params
    const postProps = req.body

    Post.findByIdAndUpdate(id, postProps)
      .then(() => Post.findById({ _id: id }))
      .then((post) => res.send(post))
      .catch(next)
  }

  delete (req, res, next) {
    const { id } = req.params
    Post.findByIdAndRemove(id)
      .then((post) => res.status(204).send(post))
      .catch(next)
  }
}

module.exports = new PostsController()
