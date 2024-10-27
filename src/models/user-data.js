const mongoose = require(mongoose)
const Schema = mongoose.Schema

const userData = new Schema ({
    nickname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
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
    },
    yearOfBirth: {
        type: Date,
        required: false
    },
    firstRegistration: {
        type: Date,
        required: true
    },
    lastSession: {
        type: Date,
        required: false
    }
})

const User = mongoose.model('users',userData)
module.exports = User