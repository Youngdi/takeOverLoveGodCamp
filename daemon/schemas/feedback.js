var mongoose = require('mongoose')
// 聊天记录模型
var FeedbackSchema = new mongoose.Schema({
  name: String,
  team: String,
  phone: String,
  age: Number,
  join: String,
  rank: Number,
  contact_time: String,
  feedback: String,
  time: String,
  update_time: {
    type: Date,
    default: Date.now()
  }
})

module.exports = FeedbackSchema
