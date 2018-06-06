var mongoose = require('mongoose')
var ChatSchema = require('../schemas/chat.js')
var Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat
