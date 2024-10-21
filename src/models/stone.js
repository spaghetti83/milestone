const mongoose = require('mongoose')
const Schema = mongoose.Schema

const milestoneDataSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    milestoneID: {
        type: String,
        required: true
    }
},{timestamps: true})

const milestoneDataModel = mongoose.model('milestoneData',milestoneDataSchema)
module.exports = milestoneDataModel