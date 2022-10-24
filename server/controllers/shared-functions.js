const Community = require('../models/community-model');
const ObjectId = require('mongoose').Types.ObjectId;

createCommunity = async (type) => {
    const community = (type == 1)?new Community({
        liked_User: [],
        disliked_User: []
    }):
    new Community({
        liked_User: [],
        disliked_User: [],
        favorite_User: [],
        views: 0
    });
    return community;
}

module.exports = {
    createCommunity
}