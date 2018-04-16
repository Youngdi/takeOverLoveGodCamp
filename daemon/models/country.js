var mongoose = require('mongoose')
var CountrySchema = require('../schemas/country')
var Country = mongoose.model('Country', CountrySchema)

module.exports = Country
