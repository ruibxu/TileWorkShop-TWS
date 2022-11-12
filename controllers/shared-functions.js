const Community = require('../models/community-model');
const ObjectId = require('mongoose').Types.ObjectId;
const Comment = require('../models/comment-model');
const { SHARE_ROLE } = require('../translator/sort-options')

createCommunity = (type) => {
    const community = (type == 1)?new Community({
        liked_User: [],
        disliked_User: [],
        likes: 0,
        dislikes: 0
    }):
    new Community({
        liked_User: [],
        disliked_Users: [],
        favorite_Users: [],
        views: 0,
        likes: 0,
        dislikes: 0
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
    if(body.new_liked_user || body.new_disliked_user){
        community.likes = community.liked_Users.length
        community.dislikes = community.disliked_Users.length
    }
    if(body.new_favorite_user){
        if(community.favorited_Users.includes(body.new_favorite_user)){
            community.favorited_Users = community.favorited_Users.filter(x => x != body.new_favorite_user);
        }
        else{
            community.favorited_Users.push(body.new_favorited_user);
        }
    }
    if(body.views){
        community.views = community.views+1;
    }
    return community;
}

updateAccess = (access, body) => {
    if(body.updatePublic){
        access.public = !access.public
        return access
    }
    if(body.new_user_id == access.owner_id){return access}
    const new_user_id = body.new_user_id
    const old_role = body.old_role
    const new_role = body.new_role

    if(old_role == SHARE_ROLE.EDITOR){access.editor_ids = access.editor_ids.filter(x => x != new_user_id)}
    if(old_role == SHARE_ROLE.VIEWER){access.viewer_ids = access.viewer_ids.filter(x => x != new_user_id)}

    if(new_role == SHARE_ROLE.EDITOR){access.editor_ids.push(new_user_id)}
    if(new_role == SHARE_ROLE.VIEWER){access.viewer_ids.push(new_user_id)}

    return access
}

deleteCommentsByLink = async (id) => {
    // console.log("Find Comments with link: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(id);

    const comment_list = await Comment.find({ link_id: _id }, (err, comments) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        // console.log("Found comment: " + JSON.stringify(comments));
    }).catch(err => console.log(err));

    const _ids = comment_list.map((x) => x._id)
    const replies = await Comment.find({ link_id: { $in: _ids } })
    const reply_ids = replies.map((x)=>x._id)
    const all_ids = [..._ids, ...reply_ids]
    await Comment.deleteMany({_id: {$in: all_ids}})
}

module.exports = {
    createCommunity,
    updateCommunity,
    updateAccess,
    deleteCommentsByLink
}