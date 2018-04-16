var mongoose = require('mongoose')
var FeedbackSchema = require('../schemas/feedback')
var Feedback = mongoose.model('Feedback', FeedbackSchema)

module.exports = Feedback
