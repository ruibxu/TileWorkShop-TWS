const { createCommunity, updateCommunity} = require('./shared-functions');
const TileMap = require('../models/tilemap-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const Access = require('../models/access-model')
const { cloudinary } = require('../cloudinary');
getTileMapById = async (req, res) => {
    console.log("Find Tilemap with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const tilemap = await TileMap.find({ _id: _id }, (err, tilemap) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        console.log("Found tilemap: " + JSON.stringify(tilemap));
    }).catch(err => console.log(err));

    return res.status(200).json({ success: true, result: { tilemap: tilemap} });
}

createTileMap = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }
    const data = req.body.data;

    const objectId = new ObjectId();
    const community = createCommunity(0);
    const access = new Access({
        owner_id: req.body.user_id,
        editor_ids: [],
        viewer_ids: [],
        public: false
    })
    data._id = objectId;
    data.community = community;
    data.access = access;
    data.lastEdited = Date.now();
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
            console.log("req.userId: " + req.body.user_id);
            if (item.access.owner_id.equals(req.body.user_id)) {
                TileMap.findOneAndDelete({ _id: objectId }).catch(err => console.log(err));
                //remember to delete from cloudinary
                return res.status(200).json({
                    sucess: true,
                    message: "TileMap Deleted"
                });
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
    console.log("updating Tilemap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            console.log("req.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id.equals(req.body.user_id) || access.editor_ids.includes(req.body.user_id)) {
                item.lastEdited = Date.now();
                if(req.body.name){item.name = req.body.name;}
                if(req.body.height){item.height = req.body.height;}
                if(req.body.width){item.width = req.body.width;}
                if(req.body.layers){item.layers = req.body.layers;}
                if(req.body.tileSet){item.tileSet = req.body.tileSet;}
                //add tileset image update later
                item.save().then(() => {
                    console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(400).json({
                            error,
                            message: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}

updateTileMapAccess = async (req, res) => {
    console.log("updating Tilemap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            console.log("req.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id.equals(req.body.user_id)) {
                if(req.body.editor_ids){access.editor_ids = req.body.editor_ids}
                if(req.body.viewer_ids){access.viewer_ids = req.body.viewer_ids}
                if(req.body.public){access.public = req.body.public}
                //add tileset image update later
                item.save().then(() => {
                    console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}

updateTileMapCommunity = async (req, res) => {
    console.log("updating TileMap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tileMap) => {
        console.log("tileMap found: " + JSON.stringify(tileMap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'TileMap not found!',
            })
        }
        //can this user update
        async function editCommunity(item){
            const body = req.body;
            const community = item.community;
            const newCommunity = updateCommunity(community, body);
            item.community = newCommunity;
            item.save()
                    .then(() => {
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: item._id,
                            message: 'TileMap Community updated!',
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'TileMap Community not updated!',
                        })
                })
        }
        editCommunity(tileMap)
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
    deleteTileMapImage,
    updateTileMapAccess,
    updateTileMapCommunity
}