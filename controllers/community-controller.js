const Community = require('../models/community-model');

updateCommunity = async (req, res) => {
    const community_id = req.param.id;
    const user_id = req.body.user_id;
    const listtype = req.body.listtype; //like, dislike/ favorite
    
    const community = await Community.findById({_id: community_id}, (err, result) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community not found!',
            })
        }});
    console.log("Community found: " + JSON.stringify(community));
    if (listtype == "liked_Users"){
        if(community.liked_Users.contains(user_id)){
            community.liked_Users = community.liked_Users.filter(x => x != user_id);
        }
        else{
            community.liked_Users.push(user_id);
            community.disliked_Users = community.liked_Users.filter(x => x != user_id);
        }
    }
    if (listtype == "disliked_Users"){
        if(community.disliked_Users.contains(user_id)){
            community.disliked_Users = community.liked_Users.filter(x => x != user_id);
        }
        else{
            community.disliked_Users.push(user_id);
            community.liked_Users = community.liked_Users.filter(x => x != user_id);
        }
    }
    if (listtype == "favorite_Users"){
        if(community.favorite_Users.contains(user_id)){
            community.favorite_Users = community.liked_Users.filter(x => x != user_id);
        }
        else{
            community.favorite_Users.push(user_id);
        }
    }
    community.save()
}

module.exports = {
    updateCommunity
}