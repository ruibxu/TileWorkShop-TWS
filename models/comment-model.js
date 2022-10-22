const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Date = Schema.Types.Date

const CommentSchema = new Schema(
    {
        _id: { type: ObjectId, required: true},
        user_id: { type: ObjectId, required: true},
        link_id: { type: ObjectId, required: true},
        content: { type: String, required: true},
        community_id: { type: ObjectId, required: true},
        dateCreated: { type: Date, required: true},
        dateUpdated: { type: Date, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)