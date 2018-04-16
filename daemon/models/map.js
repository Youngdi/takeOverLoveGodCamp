var mongoose = require('mongoose')
var MapSchema = require('../schemas/map')
var Map = mongoose.model('Map', MapSchema)

module.exports = Map
