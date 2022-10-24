const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Date = Schema.Types.Date
const Number = Schema.Types.Number
const Access = require('./access-model').schema
const Community = require('./community-model').schema

const TileSetSchema = new Schema(
    {
        _id: { type: ObjectId, required: true},
        name: {type: String, required: true},
        access: {type: Access},
        community: { type: Community},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        pixel: {type: Number, required: true},
        lastEdited: {type: Date}
    },
    { timestamps: true },
)

module.exports = mongoose.model('TileSet', TileSetSchema)