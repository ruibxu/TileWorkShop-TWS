const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Number = Schema.Types.Number
const CommunitySchema = new Schema(
    {
        liked_Users: { type: [ObjectId]},
        disliked_Users: { type: [ObjectId]},
        favorited_Users: { type: [ObjectId]},
        views: { type: Number }
    }
)

module.exports = mongoose.model('Community', CommunitySchema)
