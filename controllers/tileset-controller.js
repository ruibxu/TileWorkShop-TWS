const { createCommunity, updateCommunity, updateAccess, deleteCommentsByLink} = require('./shared-functions');

const TileSet = require('../models/tileset-model');
const Access = require('../models/access-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const { cloudinary } = require('../cloudinary');

getTileSetById = async (req, res) => {
    // console.log("Find tileSet with id: " + JSON.stringify(req.params.id));
    const _id = new ObjectId(req.params.id);

    const tileset = await TileSet.find({ _id: _id }, (err, tileset) => {
        if (err) { return res.status(400).json({ success: false, errorMessage: "Failed to get Tileset" }); }
        // console.log("Found tileset: " + JSON.stringify(tileset));
    }).catch(err => console.log(err));

    return res.status(200).json({ success: true, result: tileset[0] }); //same here
}

createTileSet = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }
    const data = req.body.data;
    if(!data.name|| !data.height|| !data.width|| !data.pixel){
        return res.status(400).json({
            errorMessage: "Missing Values"
        })
    }
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
    const tileset = new TileSet(data);
    tileset.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                tileSet: tileset,
                message: "TileSet Created"
            })
        })
        .catch(error => {
            // console.log(error)
            return res.status(400).json({
                errorMessage: 'TileSet Not Created!'
            })
        });
}

deleteTileSet = async (req, res) => {
    // console.log("deleting TileSet: " + req.params.id);
    const objectId = req.params.id;
    TileSet.findById({ _id: objectId }, (err, tileset) => {
        // console.log("tileset found: " + JSON.stringify(tileset));
        if (err) {
            return res.status(404).json({
                errorMessage: 'tileset not found!',
            })
        }
        //does this belong to the user
        async function matchUser(item) {
            // console.log("req.userId: " + req.body.user_id);
            if (item.access.owner_id.equals(req.body.user_id)) {
                deleteCommentsByLink(objectId)
                TileSet.findOneAndDelete({ _id: objectId })
                .then(res.status(200)
                .json({
                    success: true,
                    message: "TileSet Deleted"
                }))
                .catch(err => console.log(err));
                //remember to delete from cloudinary
            }
            else {
                // console.log("incorrect user!");
                return res.status(400).json({
                    errorMessage: "authentication error"
                });
            }
        }
        matchUser(tileset);
    });
}

updateTileSet = async (req, res) => {
    // console.log("updating tileSet: " + req.params.id);
    const objectId = req.params.id;
    TileSet.findById({ _id: objectId }, (err, tileSet) => {
        // console.log("tileSet found: " + JSON.stringify(tileSet));
        if (err) {
            return res.status(404).json({
                errorMessage: 'TileSet not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            // console.log("req.body.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id.equals(req.body.user_id) || access.editor_ids.includes(req.body.user_id)) {
                item.lastEdited = Date.now();
                if(req.body.name){item.name = req.body.name;}
                //add image update
                item.save()
                    .then(() => {
                        // console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: item._id,
                            message: 'TileSet updated!',
                        })
                    })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'TileSet not updated!',
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
        matchUser(tileSet);
    });
}

updateTileSetAccess = async (req, res) => {
    // console.log("updating tileSet: " + req.params.id);
    const objectId = req.params.id;
    if(!req.body){
        return res.status(201).json({
            errorMessage:"Please enter required field"
        })}
    TileSet.findById({ _id: objectId }, (err, tileSet) => {
        // console.log("tileSet found: " + JSON.stringify(tileSet));
        if (err) {
            return res.status(404).json({
                errorMessage: 'TileSet not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            // console.log("req.body.userId: " + req.body.user_id);
            access = item.access;
            if (access.owner_id.equals(body.user_id)) {
                const body = req.body;
                const access = item.access;
                const newAccess = updateAccess(access, body);
                item.access = newAccess;
                item.save()
                    .then(() => {
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: item._id,
                            tileset: item,
                            message: 'TileSet Access updated!',
                        })
                    })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'TileSet Access not updated!',
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
        matchUser(tileSet);
    });
}

updateTileSetCommunity = async (req, res) => {
    // console.log("updating tileSet: " + req.params.id);
    const objectId = req.params.id;
    TileSet.findById({ _id: objectId }, (err, tileSet) => {
        // console.log("tileSet found: " + JSON.stringify(tileSet));
        if (err) {
            return res.status(404).json({
                errorMessage: 'TileSet not found!',
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
                        // console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: item._id,
                            message: 'TileSet Community updated!',
                        })
                    })
                    .catch(error => {
                        // console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'TileSet Community not updated!',
                        })
                })
        }
        editCommunity(tileSet)
    });
}

getTileSetImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileSet_Editor/${public_id}`;
    // console.log(search)
    const { resources } = await cloudinary.search.expression(search).execute();
    if (!resources) {
        return res.status(404).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(201).json({
        _id: public_id,
        resources: resources
    })
}

updateTileSetImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const filename = req.params.id;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'TileSet_Editor_Upload',
            public_id: filename
        });
        // console.log(uploadedResponse);
        return res.status(200).json({
            success: true,
            response: uploadedResponse
        })
    } catch (error) {
        // console.log(error);
    }
}

deleteTileSetImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `TileSet_Editor/${public_id}`;
    // console.log(search)
    const resources  = await cloudinary.uploader.destroy(search);
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
    getTileSetById,
    createTileSet,
    deleteTileSet,
    updateTileSet,
    getTileSetImage,
    updateTileSetImage,
    deleteTileSetImage,
    updateTileSetAccess,
    updateTileSetCommunity
}