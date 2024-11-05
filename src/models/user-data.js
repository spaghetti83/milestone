const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userData = new Schema ({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pictureID: {
        type: String,
        required: false
    },
    milestonesIDs: {
        type: String,
        required: false
    },
    stonesNumber: {
        type: Number,
        required: false
    }
})

const User = mongoose.model('user-data',userData)
module.exports = User