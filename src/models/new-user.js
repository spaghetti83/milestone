const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    session: {
        type: String,
        require: false
    }
},{timestamps: true})

const userModel = mongoose.model('user-auth',userSchema)
module.exports = userModel