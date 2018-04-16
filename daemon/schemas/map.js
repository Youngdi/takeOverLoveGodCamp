var mongoose = require('mongoose')
// 聊天记录模型
var MapSchema = new mongoose.Schema({
  map_name: String,
  country: String,
  update_time: {
    type: Date,
    default: Date.now()
  },
  water: Number,
  fire: Number,
  wood: Number,
  stone: Number,
  seed: Number
})

module.exports = MapSchema
