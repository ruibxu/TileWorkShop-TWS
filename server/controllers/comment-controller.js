const { createCommunity, deleteCommunity } = require('./shared-functions');
const Comment = require('../models/comment-model');
const Community = require('../models/community-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const Date = require('mongoose').Types.Date;

getCommentById = async (req, res) => {
    console.log("Find Comment with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const comment = await Comment.find({ _id: _id }, (err, comment) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found comment: " + JSON.stringify(comment));
    }).catch(err => console.log(err));
    const community_id = new ObjectId(comment.community_id);

    const community = await Community.find({ community_id: community_id }, (err, community) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found comment: " + JSON.stringify(community));
    }).catch(err => console.log(err));

    return res.status(200).json({ success: true, result: { comment: comment, community: community } });
}

getCommentsByLink = async (req, res) => {
    console.log("Find Comments with link: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const comment_list = await Comment.find({ link_id: _id }, (err, comments) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found comment: " + JSON.stringify(comments));
    }).catch(err => console.log(err));

    const community_ids = comment_list.map(x => new ObjectId(x.community_id));
    const communities = await Community.find({ _id: { $in: community_ids } }, (err, community) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found comment: " + JSON.stringify(community));
    }).catch(err => console.log(err));

    const pairs = comment_list.map(x => ({
        comment: x,
        community: communities.find(y => y._id == x.community_id),
    }));

    return res.status(200).json({ success: true, result: pairs });
}

createComment = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }
    const community_id = createCommunity("Comment");
    const comment = new Comment({
        _id: new ObjectId(),
        user_id: new ObjectId(body.user_id),
        link_id: new ObjectId(link.link_id),
        content: body.content,
        community_id, community_id,
        dateCreated: new Date(),
        dateUpdated: new Date(),
    });
    const updated = comment.save();
    if (!updated) { return res.status(400).json({ errorMessage: 'Comment Not Created!' }); }
    return res.status(200).json({ success: true, result: { comment: comment, community: community } });
}

deleteComment = async (req, res) => {
    console.log("deleting Comment: " + req.params.id);
    const objectId = req.params.id;
    Comment.findById({ _id: objectId }, (err, comment) => {
        console.log("comment found: " + JSON.stringify(comment));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Comment not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            if (item.user_id == req.user_id) {
                deleteCommunity(item.community_id);
                Comment.findOneAndDelete({ _id: objectId }).catch(err => console.log(err));
                return res.status(200).json({});
            }
            else {
                console.log("incoorect user!");
                return res.status(400).json({
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(comment);
    });
}

updateComment = async (req, res) => {
    console.log("updating Comment: " + req.params.id);
    const objectId = req.params.id;
    const content = req.body.content;
    Comment.findById({ _id: objectId }, (err, comment) => {
        console.log("comment found: " + JSON.stringify(comment));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Comment not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            if (item.user_id == req.user_id) {
                item.content = content;
                item.save().then(() => {
                    console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        message: 'Top 5 List updated!',
                    })
                })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Comment not updated!',
                        })
                    })
                return res.status(200).json({});
            }
            else {
                console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(comment);
    });
}

module.exports = {
    getCommentById,
    getCommentsByLink,
    createComment,
    updateComment,
    deleteComment
}