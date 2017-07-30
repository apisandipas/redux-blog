const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A title is required.']
  },
  content: {
    type: String,
    required: [true, 'A content body is required.']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('post', PostSchema)
