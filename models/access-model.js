const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AccessSchema = new Schema(
    {
        owner_id: { type: ObjectId, required: true },
        editor_ids: { type: [ObjectId], required: true },
        viewer_ids: { type: [ObjectId], required: true },
        public: { type: Boolean, required: true }
    }
)

module.exports = mongoose.model('Access', AccessSchema)