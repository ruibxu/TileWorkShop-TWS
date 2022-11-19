const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Number = Schema.Types.Number
const Property = require('./property-model').schema

const LayerSchema = new Schema(
    {
        name: { type: String, required: true },
        data: { type: [Object], required: true },
        properties: { type:[Property], required: true },
        locked: {type: Boolean, required: true},
        hidden: {type: Boolean, required: true}
    }
)

module.exports = mongoose.model('Layer', LayerSchema)