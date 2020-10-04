const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    image: String,
    title: String,
    content: String,
    token: String,
    language: String
})

const favoriteModel = mongoose.model('favorites', favoriteSchema)

module.exports = favoriteModel