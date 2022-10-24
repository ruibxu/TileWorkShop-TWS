const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Number = Schema.Types.Number
const CommunitySchema = new Schema(
    {
        liked_User: { type: [ObjectId]},
        disliked_User: { type: [ObjectId]},
        favorited_User: { type: [ObjectId]},
        view: { type: Number }
    }
)

module.exports = mongoose.model('Community', CommunitySchema)
