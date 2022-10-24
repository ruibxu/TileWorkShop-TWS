const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Date = Schema.Types.Date
const Number = Schema.Types.Number
const Access = require('./access-model').schema

const TileSetSchema = new Schema(
    {
        _id: { type: ObjectId},
        name: {type: String},
        access: {type: Access},
        community_id: { type: ObjectId},
        height: {type: Number},
        width: {type: Number},
        pixel: {type: Number}

    },
    { timestamps: true },
)

module.exports = mongoose.model('TileSet', TileSetSchema)