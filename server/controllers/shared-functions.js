const Community = require('../models/community-model');
const ObjectId = require('mongoose').Types.ObjectId;

createCommunity = (type) => {
    const community = (type == 1)?new Community({
        liked_User: [],
        disliked_User: []
    }):
    new Community({
        liked_User: [],
        disliked_Users: [],
        favorite_Users: [],
        views: 0
    });
    return community;
}

updateCommunity = (community, body) => {

    if(body.new_liked_user){
        if(community.liked_Users.includes(body.new_liked_user)){
            community.liked_Users = community.liked_Users.filter(x => x != body.new_liked_user);
        }
        else{
            community.liked_Users.push(body.new_liked_user);
            community.disliked_Users = community.disliked_Users.filter(x => x != body.new_liked_user);
        }
    }
    if(body.new_disliked_user){
        if(community.disliked_Users.includes(body.new_disliked_user)){
            community.disliked_Users = community.disliked_Users.filter(x => x != body.new_disliked_user);
        }
        else{
            community.disliked_Users.push(body.new_disliked_user);
            community.liked_Users = community.liked_Users.filter(x => x != body.new_disliked_user);
        }
    }
    if(body.new_favorite_user){
        if(community.favorite_Users.includes(body.new_favorite_user)){
            community.favorite_Users = community.favorite_Users.filter(x => x != body.new_favorite_user);
        }
        else{
            community.favorite_Users.push(body.new_favorite_user);
        }
    }
    if(body.views){
        community.views = community.views+1;
    }
    return community;
}

module.exports = {
    createCommunity,
    updateCommunity
}