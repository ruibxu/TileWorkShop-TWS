const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommunitySchema = new Schema(
    {
        _id: {type: ObjectId, required: true},
        type: {type: String, required: true},
        liked_User: { type: [ObjectId], required: true },
        disliked_User: { type: [ObjectId], required: true },
        favorited_User: { type: [ObjectId]},
        view: { type: Int }
    }
)

module.exports = mongoose.model('Community', CommunitySchema)
