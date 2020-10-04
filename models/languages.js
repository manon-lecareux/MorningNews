const mongoose = require('mongoose')

const langSchema = mongoose.Schema({
    language: String
    
})

const langModel = mongoose.model('languages', langSchema)

module.exports = langModel