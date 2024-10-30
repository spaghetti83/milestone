const mongoose = require('mongoose')
const Schema = mongoose.Schema

const milestoneDataSchema = new Schema({
    ownerID: {
        type: String,
        required: true
     },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stertingYear: {
        type: Date,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    picID: {
        type: String,
        required: false
    }
})

const milestone = mongoose.model('milestones',milestoneDataSchema)
exports.model = milestone