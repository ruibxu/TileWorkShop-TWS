const { createCommunity, updateCommunity, updateAccess, deleteCommentsByLink, getAccessUsers } = require('./shared-functions');

const TileMap = require('../models/tilemap-model');
const TileSet = require('../models/tileset-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const Access = require('../models/access-model')
const { cloudinary } = require('../cloudinary');
const getTileMapById = async (req, res) => {
    // console.log("Find Tilemap with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const found = await TileMap.find({ _id: _id }, (err, tilemap) => {
        if (err) { return res.status(400).json({ success: false, errorMessage: "Failed to get TileMap" }); }
        // console.log("Found tilemap: " + JSON.stringify(tilemap));
    }).catch(err => console.log(err));
    const tilemap = found[0]
    const users = await getAccessUsers(tilemap.access)

    return res.status(200).json({ success: true, result: tilemap, users: users }); //changed this to return the first tilemap 
}

const createTileMap = async (req, res) => {
    if (!req.body) {
        return res.status(201).json({
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
        public: true //change it back to false later 
    })
    data._id = objectId;
    data.community = community;
    data.access = access;
    data.lastEdited = Date.now();
    //data.tileset.forEach(x => x._id = new ObjectId(x._id))
    const tilemap = new TileMap(data);
    console.log(tilemap)
    tilemap.save().then(() => {
        return res.status(200).json({
            success: true,
            tileMap: tilemap,
            tilesets: data.tileset,
            message: "TileMap Created"
        })
    }).catch(error => {
        // console.log(error)
        return res.status(201).json({
            errorMessage: 'TileMap Not Created!',
            tileMap: tilemap
        })
    });
}

const deleteTileMap = async (req, res) => {
    // console.log("deleting TileMap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        // console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'tilemap not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            // console.log("req.userId: " + req.body.user_id);
            if (item.access.owner_id == req.params.user_id) {
                deleteCommentsByLink(objectId)
                const found = await TileMap.findOneAndDelete({ _id: objectId }).catch(err => console.log(err));
                //remember to delete from cloudinary
                return res.status(200).json({
                    sucess: true,
                    result: found,
                    message: "TileMap Deleted"
                });
            }
            else {
                // console.log("incorrect user!");
                return res.status(400).json({
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}

const updateTileMap = async (req, res) => {
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            access = item.access;
            if (access.owner_id == req.body.user_id || access.editor_ids.includes(req.body.user_id)) {
                item.lastEdited = Date.now();
                if (req.body.name) { item.name = req.body.name; }
                if (req.body.height) { item.height = req.body.height; }
                if (req.body.width) { item.width = req.body.width; }
                if (req.body.layers) { item.layers = req.body.layers; }
                if (req.body.url) {item.url = req.body.url; }
                //add tileset image update later
                item.save().then(() => {
                    // console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        item: item,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(201).json({
                            error,
                            message: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                // console.log("incorrect user!");
                return res.status(201).json({
                    success: false,
                    errorMessage: "authentication error",
                });
            }
        }
        matchUser(tilemap);
    });
}

const updateTileMapAccess = async (req, res) => {
    // console.log("updating Tilemap: " + req.params.id);
    const objectId = req.params.id;
    if (!req.body) {
        return res.status(201).json({
            errorMessage: "Please enter required field"
        })
    }
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        // console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            // console.log("req.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id == req.body.user_id) {
                const body = req.body;
                const access = item.access;
                const newAccess = updateAccess(access, body);
                item.access = newAccess;
                item.save().then(() => {
                    // console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        tilemap: item,
                        access: newAccess,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                // console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}

const updateTileMapCommunity = async (req, res) => {
    // console.log("updating TileMap: " + req.params.id);
    const objectId = req.params.id;
    TileMap.findById({ _id: objectId }, (err, tileMap) => {
        // console.log("tileMap found: " + JSON.stringify(tileMap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'TileMap not found!',
            })
        }
        //can this user update
        async function editCommunity(item) {
            const body = req.body;
            const community = item.community;
            const newCommunity = updateCommunity(community, body);
            item.community = newCommunity;
            item.save()
                .then(() => {
                    // console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        result: item,
                        message: 'TileMap Community updated!',
                    })
                })
                .catch(error => {
                    // console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: 'TileMap Community not updated!',
                    })
                })
        }
        editCommunity(tileMap)
    });
}

const addTileSetToTileMap = async (req, res) => {
    // console.log("updating Tilemap: " + req.params.id);
    const objectId = req.params.id;
    const tileset = req.body.tileset;
    const newId = new ObjectId();
    tileset._id = newId
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        // console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            // console.log("req.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id.equals(req.body.user_id) || access.editor_ids.includes(req.body.user_id)) {
                item.tileset.push(tileset);
                item.lastEdited = Date.now();
                item.save().then(() => {
                    // console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        result: item,
                        tileset_id: newId,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(400).json({
                            error,
                            errorMessage: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                // console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}

const updateTileSetinTileMap = async (req, res) => {
    // console.log("updating Tilemap: " + req.params.id);
    const objectId = req.params.id;
    const tileset_id = req.body.tileset_id;
    const newName = req.body.name;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        // console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            // console.log("req.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id == req.body.user_id || access.editor_ids.includes(req.body.user_id)) {
                const tileset_list = item.tileset;
                tileset_list.map(x => x.name = (tileset_id == x._id) ? newName : x.name)
                item.tileset = tileset_list
                item.lastEdited = Date.now();
                item.save().then(() => {
                    // console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        result: item,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(400).json({
                            error,
                            message: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                // console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}

const deleteTileSetfromTileMap = async (req, res) => {
    // console.log("updating Tilemap: " + req.params.id);
    const objectId = req.params.id;
    const delete_id = req.body.tileset_id;
    TileMap.findById({ _id: objectId }, (err, tilemap) => {
        // console.log("tilemap found: " + JSON.stringify(tilemap));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Tilemap not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            // console.log("req.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id.equals(req.body.user_id) || access.editor_ids.includes(req.body.user_id)) {
                const newTileset = item.tileset.filter(x => x._id != delete_id);
                item.tileset = newTileset
                item.lastEdited = Date.now();
                item.save().then(() => {
                    // console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: item._id,
                        result: item,
                        message: 'Tilemap updated!',
                    })
                })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(400).json({
                            error,
                            message: 'Tilemap not updated!',
                        })
                    })
            }
            else {
                // console.log("incorrect user!");
                return res.status(400).json({
                    success: false,
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tilemap);
    });
}
const deleteTest = async (req, res) => {
    const tilemap = await TileMap.deleteOne({ name: "test" }).then(() => {
        return res.status(200)
    })
    if (tilemap) {
        return res.status(200).json({ success: true })
    }
}
module.exports = {
    getTileMapById,
    createTileMap,
    deleteTileMap,
    updateTileMap,
    updateTileMapAccess,
    updateTileMapCommunity,
    addTileSetToTileMap,
    updateTileSetinTileMap,
    deleteTileSetfromTileMap,
    deleteTest
}