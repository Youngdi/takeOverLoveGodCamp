var mongoose = require('mongoose')

var ChatSchema = new mongoose.Schema({
  country: String,
  user: Object,
  createdAt: Date,
  text: String
})

module.exports = ChatSchema
