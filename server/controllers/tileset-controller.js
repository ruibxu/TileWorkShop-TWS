import {createCommunity, deleteCommunity} from './shared-functions';

const TileSet = require('../models/tileset-model');
const Access = require('../models/access-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;

getTileSetById = async (req, res) => {
    console.log("Find Comment with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const tileset = await TileSet.find({_id: _id}, (err, tileset) => {
        if (err) {return res.status(400).json({ success: false, error: err });}
        console.log("Found tileset: " + JSON.stringify(tileset));
    }).catch(err => console.log(err));
    const community_id = new ObjectId(tileset.community_id);

    const community = await Community.find({community_id: community_id}, (err, community) => {
        if (err) {return res.status(400).json({ success: false, error: err });}
        console.log("Found community: " + JSON.stringify(community));
    }).catch(err => console.log(err));
    
    return res.status(200).json({ success: true, result: {tileset: tileset, community: community}});
}

createTileSet = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const objectId = new ObjectId();
    const community_id = createCommunity("TileSet");
    const access = new Access({
        owner_Id: req.user_id,
        editor_Ids: [],
        viewer_Ids: [],
        public: false
    })
    body._id = objectId;
    body.community_id = community_id;
    body.access = access;
    const tileset = new TileSet(body);
    tileset.save().catch(error => {
        return res.status(400).json({
            errorMessage: 'TileSet Not Created!'
        })
    });
    //remember to add images
    return res.status(201).json({
        tileSet: tileSet
    })
}

deleteTileSet = async (req, res) => {
    console.log("deleting TileSet: " + req.params.id);
    const objectId = req.params.id;
    TileSet.findById({_id: objectId}, (err, tileset) => {
        console.log("tileset found: " + JSON.stringify(tileset));
        if (err) {
            return res.status(404).json({
                errorMessage: 'tileset not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            if(item.access.owner_id == req.user_id){
                deleteCommunity(item.community_id);
                TileSet.findOneAndDelete({ _id: objectId }).catch(err => console.log(err));
                //remember to delete from cloudinary
                return res.status(200).json({});
            }
            else {
                console.log("incorrect user!");
                return res.status(400).json({ 
                    errorMessage: "authentication error" 
                });
            }
        }
        matchUser(tileset);
    });
}

updateTileSet = async (req, res) => {
    console.log("updating Comment: " + req.params.id);
    const objectId = req.params.id;
    Comment.findById({_id: objectId}, (err, comment) => {
        console.log("comment found: " + JSON.stringify(comment));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Comment not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            access = item.access;
            if(access.owner_id == req.user_id || access.editor_ids.includes(req.user_id)){
                item.height = req.body.height;
                item.width = req.body.width;
                //add image update
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
    getTileSetById,
    createTileSet,
    deleteTileSet,
    updateTileSet
}