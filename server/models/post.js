const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const PostSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    required: [true, 'A title is required.']
  },
  content: {
    type: String,
    default: '',  
    required: [true, 'A content body is required.']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('post', PostSchema)
