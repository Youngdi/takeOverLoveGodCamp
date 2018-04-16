var mongoose = require('mongoose')
// 聊天记录模型
var CountrySchema = new mongoose.Schema({
  country: String,
  update_time: {
    type: Date,
    default: Date.now()
  },
  K: Number,
  water: Number,
  fire: Number,
  wood: Number,
  stone: Number,
  seed: Number,
  B1: Number,
  B2: Number,
  B3: Number,
  B4: Number,
  B5: Number,
  B6: Number
})

module.exports = CountrySchema
