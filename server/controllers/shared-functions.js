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

updateCommunity = async (community, body) => {
    if(body.new_liked_user){
        if(community.liked_Users.contains(user_id)){
            community.liked_Users = community.liked_Users.filter(x => x !== user_id);
        }
        else{
            community.liked_Users.push(user_id);
            community.disliked_Users = community.liked_Users.filter(x => x !== user_id);
        }
    }
    if(body.new_disliked_user){
        if(community.disliked_Users.contains(user_id)){
            community.disliked_Users = community.liked_Users.filter(x => x !== user_id);
        }
        else{
            community.disliked_Users.push(user_id);
            community.liked_Users = community.liked_Users.filter(x => x !== user_id);
        }
    }
    if(body.new_favorite_user){
        if(community.favorite_Users.contains(user_id)){
            community.favorite_Users = community.liked_Users.filter(x => x !== user_id);
        }
        else{
            community.favorite_Users.push(user_id);
        }
    }
    if(body.view){
        community.view = community.view+1;
    }
    return community;
}

module.exports = {
    createCommunity,
    updateCommunity
}