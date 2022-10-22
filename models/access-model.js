const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AccessSchema = new Schema(
    {
        Owner_Id: { type: ObjectId, required: true },
        editor_Ids: { type: [ObjectId], required: true },
        viewer_Ids: { type: [ObjectId], required: true },
        public: { type: Boolean, required: true }
    }
)

module.exports = mongoose.model('Access', AccessSchema)