const TileMap = require('../models/tilemap-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const Community = require('../models/community-model');
const Access = require('../models/access-model')
const { cloudinary } = require('../cloudinary');
getTileMapById = async (req, res) => {
    console.log("Find Comment with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const tilemap = await TileMap.find({ _id: _id }, (err, tilemap) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found tilemap: " + JSON.stringify(tilemap));
    }).catch(err => console.log(err));
    const community_id = new ObjectId(tilemap.community_id);

    const community = await Community.find({ community_id: community_id }, (err, community) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found community: " + JSON.stringify(community));
    }).catch(err => console.log(err));

    return res.status(200).json({ success: true, result: { tilemap: tilemap, community: community } });
}

createTileMap = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }
    const data = req.body.data;

    const objectId = new ObjectId();
    const community_id = await createCommunity("TileMap");
    const access = new Access({
        owner_id: req.body.user_id,
        editor_ids: [],
        viewer_ids: [],
        public: false
    })
    data._id = objectId;
    data.community_id = community_id;
    data.access = access;
    const tilemap = new TileMap(data);
    console.log(tilemap)
    tilemap.save().then(() => {
        return res.status(201).json({
            tileMap: tilemap
        })
    }).catch(error => {
        console.log(error)
        return res.status(400).json({
            errorMessage: 'TileMap Not Created!'
        })
    });
}

deleteTileMap = async (req, res) => {
    console.log("deleting TileMap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'tilemap not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            if (item.access.owner_id == req.user_id) {
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
    Comment.findById({ _id: objectId }, (err, comment) => {
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
            if (access.owner_id == req.user_id || access.editor_ids.includes(req.user_id)) {
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

getTileMapImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileMap_Uses/${public_id}`;
    const { resources } = await cloudinary.search.expression(search).execute();
    if (!resources) {
        return res.status(404).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(201).json({
        resources: resources
    })
}

updateTileMapImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const filename = req.params.id;
        console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'TileMap_Uses_Upload',
            public_id: filename
        });
        console.log(uploadedResponse);
        return res.status(200).json({
            success: true,
            response: uploadedResponse
        })
    } catch (error) {
        console.log(error);
    }
}

deleteTileMapImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `TileMap_Uses/${public_id}`;
    const resources = await cloudinary.uploader.destroy(search);
    if (resources.result === "not found") {
        return res.status(404).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(201).json({
        Message: 'image deleted'
    })
}

module.exports = {
    getTileMapById,
    createTileMap,
    deleteTileMap,
    updateTileMap,
    getTileMapImage,
    updateTileMapImage,
    deleteTileMapImage
}