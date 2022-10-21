const TileMap = require('../models/tilemap-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;

getTileMapById = async (req, res) => {
    console.log("Find Comment with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const tilemap = await TileMap.find({_id: _id}, (err, tilemap) => {
        if (err) {return res.status(400).json({ success: false, error: err });}
        console.log("Found tilemap: " + JSON.stringify(tilemap));
    }).catch(err => console.log(err));
    const community_id = new ObjectId(tilemap.community_id);

    const community = await Community.find({community_id: community_id}, (err, community) => {
        if (err) {return res.status(400).json({ success: false, error: err });}
        console.log("Found community: " + JSON.stringify(community));
    }).catch(err => console.log(err));
    
    return res.status(200).json({ success: true, result: {tilemap: tilemap, community: community}});
}

createTileMap = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const objectId = new ObjectId();
    const community_id = createCommunity("TileMap");
    const access = new Access({
        owner_Id: req.user_id,
        editor_Ids: [],
        viewer_Ids: [],
        public: false
    })
    body._id = objectId;
    body.community_id = community_id;
    body.access = access;
    const tilemap = new TileMap(body);
    tilemap.save().catch(error => {
        return res.status(400).json({
            errorMessage: 'TileMap Not Created!'
        })
    });
    //remember to add images
    return res.status(201).json({
        tileSet: tileSet
    })
}

deleteTileMap = async (req, res) => {
    console.log("deleting TileMap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({_id: objectId}, (err, tilemap) => {
        console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'tilemap not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            if(item.access.owner_id == req.user_id){
                deleteCommunity(item.community_id);
                TileMap.findOneAndDelete({ _id: objectId }).catch(err => console.log(err));
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
        matchUser(tilemap);
    });
}

updateTileMap = async (req, res) => {
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
                item.layers = req.body.layers;
                item.tileSet = req.body.tileSet;
                //add tileset image update later
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
    getTileMapById,
    createTileMap,
    deleteTileMap,
    updateTileMap
}