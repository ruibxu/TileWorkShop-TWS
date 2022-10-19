const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        top5Lists: [{type: ObjectId, ref: 'Top5List'}]
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
