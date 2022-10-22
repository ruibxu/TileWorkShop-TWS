const Community = require('../models/community-model');
const ObjectId = require('mongoose').Types.ObjectId;

createCommunity = async (type) => {
    const objectId = new ObjectId();
    const community = (type == "comment")?new Community({
        _id: objectId,
        type: type,
        liked_User: [],
        disliked_User: []
    }):
    new Community({
        _id: objectId,
        type: type,
        liked_User: [],
        disliked_User: [],
        favorite_User: [],
        views: 0
    });
    community.save();
    return objectId;
}

deleteCommunity = async (id) => {
    Community.findOneAndDelete({_id: id}).catch(err => console.log(err));
}

module.exports = {
    createCommunity,
    deleteCommunity
}