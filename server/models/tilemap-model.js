const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Date = Schema.Types.Date
const Number = Schema.Types.Number
const Access = require('./access-model')
const TileSet = require('./tileset-model')
const Layer = require('./layer-model')

const TileMapSchema = new Schema(
    {
        _id: { type: ObjectId, required: true},
        name: {type: String, required: true},
        access: {type: Access, required: true},
        community_id: { type: ObjectId, required: true},
        tileset: {type: TileSet},
        layers: {type: [Layer], required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        dateCreated: { type: Date, required: true},
        dateUpdated: { type: Date, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('TileMap', TileMapSchema)