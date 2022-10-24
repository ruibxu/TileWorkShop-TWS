const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Date = Schema.Types.Date
const Number = Schema.Types.Number
const Access = require('./access-model').schema
const TileSet = require('./tileset-model').schema
const Layer = require('./layer-model').schema
const Community = require('./community-model').schema

const TileMapSchema = new Schema(
    {
        _id: { type: ObjectId, required: true},
        name: {type: String, required: true},
        access: {type: Access, required: true},
        Community: { type: Community, required: true},
        tileset: {type: [TileSet]},
        layers: {type: [Layer], required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('TileMap', TileMapSchema)