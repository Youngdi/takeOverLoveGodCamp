var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
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
  B6: Number,
  P1: String,
  P2: String,
  P3: String,
  P4: String,
  P5: String,
  P6: String,
  P7: String,
  P8: String,
  P9: String,
  P10: String,
  R1: String,
  R2: String,
  R3: String,
  R4: String,
  R5: String,
  R6: String,
  R7: String,
  R8: String,
  R9: String,
  R10: String
})

module.exports = UserSchema
