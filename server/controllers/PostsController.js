const Post = require('../models/post')

class PostsController {
  /**
   * List all posts
   * @param  {Object}   req  Express request object
   * @param  {Object}   res  Express response object
   * @param  {Function} next Call next in middleware chain
   * @return {Promise}        Resolves with list of posts
   */
  index (req, res, next) {
    const limit = req.query.limit || 10 
    const skip = req.query.skip || 0 

    Post.find({})
      .limit(limit)
      .skip(skip)
      .then((response) => res.send(response))
      .catch(next)
  }

  /**
   * Creates a new post and returns it
   * @param  {Object}   req  Express request object
   * @param  {Object}   res  Express response object
   * @param  {Function} next Call next in middleware chain
   * @return {Promise}       Resolves with newly create post
   */
  create (req, res, next) {
    const postProps = req.body
    Post.create(postProps)
     .then((post) => res.send(post))
     .catch(next)
  }

  /**
   * Queries a single post by id
   * @param  {Object}   req  Express request object
   * @param  {Object}   res  Express response object
   * @param  {Function} next Call next in middleware chain
   * @return {Promise}       Resolves with the queried post
   */
  read (req, res, next) {
    const { id } = req.params

    Post.findOne({ _id: id })
      .then((post) => res.send(post))
      .catch(next)
  }

  /**
   * Updates a post with the given id
   * @param  {Object}   req  Express request object
   * @param  {Object}   res  Express response object
   * @param  {Function} next Call next in middleware chain
   * @return {Promise}       Resolves with updated post
   */
  update (req, res, next) {
    const { id } = req.params
    const postProps = req.body

    Post.findByIdAndUpdate(id, postProps)
      .then(() => Post.findById({ _id: id }))
      .then((post) => res.send(post))
      .catch(next)
  }

  /**
   * Deletes a post with the given id
   * @param  {Object}   req  Express request object
   * @param  {Object}   res  Express response object
   * @param  {Function} next Call next in middleware chain
   * @return {Promise}       Resolves with deleted posts
   */
  delete (req, res, next) {
    const { id } = req.params
    Post.findByIdAndRemove(id)
      .then((post) => res.status(204).send(post))
      .catch(next)
  }
}

module.exports = new PostsController()
