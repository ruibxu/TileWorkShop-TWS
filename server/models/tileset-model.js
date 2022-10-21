const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Date = Schema.Types.Date
const Access = require('./access-model')

const TileSetSchema = new Schema(
    {
        _id: { type: ObjectId, required: true},
        name: {type: String, required: true},
        access: {type: Access, required: true},
        community_id: { type: ObjectId},
        height: {type: int, required: true},
        width: {type: int, required: true},
        pixel: {type: int, required: true},
        dateCreated: { type: Date},
        dateUpdated: { type: Date},

    },
    { timestamps: true },
)

module.exports = mongoose.model('TileSet', TileSetSchema)