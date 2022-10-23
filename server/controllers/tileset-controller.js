const {createCommunity, deleteCommunity} = require('./shared-functions');

const TileSet = require('../models/tileset-model');
const Access = require('../models/access-model');
const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const Community = require('../models/community-model');
const { cloudinary } = require('../cloudinary');

getTileSetById = async (req, res) => {
    console.log("Find tileSet with id: " + JSON.stringify(req.params.id));
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
    tileset.save()
    .then(()=> {
        return res.status(201).json({
            sucess: true,
            tileSet: tileset,
            message: "TileSet Created"
        })
    })
    .catch(error => {
        return res.status(400).json({
            errorMessage: 'TileSet Not Created!'
        })
    });
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
    console.log("updating tileSet: " + req.params.id);
    const objectId = req.params.id;
    TileSet.findById({_id: objectId}, (err, tileSet) => {
        console.log("tileSet found: " + JSON.stringify(tileSet));
        if (err) {
            return res.status(404).json({
                errorMessage: 'tileSet not found!',
            })
        }
        //can this user update
        async function matchUser(item) {
            console.log("req.userId: " + req.user_id);
            access = item.access;
            if(access.owner_id == req.user_id || access.editor_ids.includes(req.user_id)){
                item.name = req.body.name;

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
                                message: 'tileSet not updated!',
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
        matchUser(tileSet);
    });
}

getTileSetImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileSet_Editor/${public_id}`;
    const {resources} = await cloudinary.search.expression(search);
    if(!resources){
        return res.status(404).json({
            errorMessage: 'image not found!',
    });}
    return res.status(201).json({
        resources: resources
    })
}

updateTileSetImage = async (req, res) => {
    try{
        const fileStr = req.body.data;
        const filename = req.params.id;
        console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'TileSet_Editor_Upload',
            public_id: filename
        });
        console.log(uploadedResponse);
        return res.status(200).json({
            success: true,
            response: uploadedResponse
        })
    } catch(error){
        console.log(error);
    }
}

deleteTileSetImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileSet_Editor/${public_id}`;
    const {resources} = await cloudinary.uploader.destroy(search);
    if(!resources){
        return res.status(404).json({
            errorMessage: 'image not found!',
    });}
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
    deleteTileSetImage
}