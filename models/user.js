const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
})
userSchema.plugin(passportLocalMongoose.default)
module.exports = mongoose.model('User', userSchema)