var mongoose = require('mongoose')
// 聊天记录模型
var QuestionSchema = new mongoose.Schema({
  name: String,
  question: String,
  time: String,
  update_time: {
    type: Date,
    default: Date.now()
  }
})

module.exports = QuestionSchema
