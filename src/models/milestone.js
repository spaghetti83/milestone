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
    startingYear: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    picID: {
        type: String,
        required: false
    },
    stones: [{
        date: {
            type: Date,
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
        milestoneID: {
            type: String,
            required: true
        }
    }],
    stonesNumbers: {
        type: Number,
        virtual: true,
        get() { return this.stones.length }
    }
},{timestamps: true} )

const milestone = mongoose.model('milestones',milestoneDataSchema)
module.exports = milestone