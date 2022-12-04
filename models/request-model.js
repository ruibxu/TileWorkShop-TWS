const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RequestSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
        request_type: { type: String, required: true },
        user_id: { type: ObjectId },
        related_id: { type: ObjectId },
        createdAt: { type: Date, expireAfterSeconds: 3600, default: Date.now }
    }
)

module.exports = mongoose.model('Request', RequestSchema)

//_id: an excusive id to this request
//request type: check translator/request-options
//user_id: the user making the request
//related_id: the id of the affected object (can be user or project id)