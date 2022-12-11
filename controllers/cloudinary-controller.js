const { cloudinary } = require('../cloudinary');

//#----------------------------------------------TileMap's tileset images
const getTileMapImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileMap_Uses/${public_id}`;
    const { resources } = await cloudinary.v2.search.expression(search).execute();
    if (!resources) {
        return res.status(404).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(200).json({
        _id: public_id,
        resources: resources
    })
}

const getRelatedTileSets = async (req, res) => {
    const tilemap_id = req.params.id;
    const search = `folder:TileMap_Uses AND tags=${tilemap_id} OR folder:TileMap_Uses/${tilemap_id}`
    const { resources }= await cloudinary.v2.search.expression(search).execute();
    if(!resources){
        return res.status(201).json({
            errorMessage: 'images not found!',
        });
    }
    return res.status(200).json({
        _id: tilemap_id,
        resources: resources
    })
}

const deleteTileMap = async (req, res) => {
    const tilemap_id = req.params.id;
    const search = `folder:TileMap_Uses AND tags=${tilemap_id} OR folder:TileMap_Uses/${tilemap_id}`
    const searchFolder = `TileMap_Uses/${tilemap_id}`
    const deleteTileMap = `TileMap_Thumbnail/${tilemap_id}`
    const response2 = await cloudinary.v2.uploader.destroy(deleteTileMap).catch(error => {console.log(error)})
    const response3 = await cloudinary.v2.api.delete_resources_by_tag(tilemap_id).catch(error => {console.log(error)});
    // return res.status(200).json({message: "worked", id: tilemap_id})
    const response = await cloudinary.v2.api.delete_folder(searchFolder).catch(error => {console.log(error)})
    .catch(error => 
        {return res.status(200).json({
            message:"No folder to delete",
            error
        })}
    )
    return res.status(200).json({
        _id: tilemap_id,
        resources: response,
        //resources2: response2.resources
    })
}

const updateTileMapImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const public_id = req.params.id;
        const tag_id = req.body.map_id;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
            upload_preset: 'TileMap_Uses_Upload',
            folder: `TileMap_Uses/${tag_id}`,
            public_id: public_id,
            tags: [tag_id]
        });
        // console.log(uploadedResponse);
        return res.status(200).json({
            success: true,
            _id: public_id,
            resources: uploadedResponse
        })
    } catch (error) {
        // console.log(error);
    }
}

const deleteTileMapImage = async (req, res) => {
    const public_id = req.params.id;
    const tag_id = req.params.map_id;
    const search = `TileMap_Uses/${tag_id}/${public_id}`;
    const resources = await cloudinary.v2.uploader.destroy(search);
    if (resources.result === "not found") {
        const search2 = `TileMap_Uses/${public_id}`
        const resources2 = await cloudinary.v2.uploader.destroy(search2)
        if(resources2.result === "not found"){
            return res.status(201).json({
                errorMessage: 'image not found!',
            });
        }
    }
    return res.status(200).json({
        Message: 'image deleted'
    })
}
//#--------------------------------------------------------------Tilemap thumbnails
const getTileMapThumbnail = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileMap_Thumbnail/${public_id}`;
    const { resources } = await cloudinary.v2.search.expression(search).execute();
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

const updateTileMapThumbnail = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const public_id = req.params.id;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
            upload_preset: 'TileMap_Thumbnail_Upload',
            public_id: public_id,
            tags: [public_id]
        });
        // console.log(uploadedResponse);
        return res.status(200).json({
            success: true,
            _id: public_id,
            resources: uploadedResponse
        })
    } catch (error) {
        // console.log(error);
    }
}

const deleteTileMapThumbnail = async (req, res) => {
    const public_id = req.params.id;
    const search = `TileMap_Thumbnail/${public_id}`;
    const resources = await cloudinary.v2.uploader.destroy(search);
    if (resources.result === "not found") {
        return res.status(404).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(200).json({
        Message: 'image deleted'
    })
}
//#--------------------------------------------------------------Tileset Images
const getTileSetImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileSet_Editor/${public_id}`;
    // console.log(search)
    const { resources } = await cloudinary.v2.search.expression(search).execute();
    if (!resources) {
        return res.status(201).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(200).json({
        _id: public_id,
        resources: resources
    })
}

const updateTileSetImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const public_id = req.params.id;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
            upload_preset: 'TileSet_Editor_Upload',
            public_id: public_id
        });
        // console.log(uploadedResponse);
        return res.status(200).json({
            success: true,
            _id: public_id,
            resources: uploadedResponse
        })
    } catch (error) {
        // console.log(error);
    }
}

const deleteTileSetImage = async (req, res) => {
    const public_id = req.params.id;
    const search = `TileSet_Editor/${public_id}`;
    // console.log(search)
    const resources  = await cloudinary.v2.uploader.destroy(search);
    if (resources.result === "not found") {
        return res.status(201).json({
            errorMessage: 'image not found!',
        });
    }
    return res.status(200).json({
        Message: 'image deleted'
    })
}


module.exports = {
    getTileMapImage,
    updateTileMapImage,
    deleteTileMapImage,
    getTileMapThumbnail,
    updateTileMapThumbnail,
    deleteTileMapThumbnail,
    getTileSetImage,
    updateTileSetImage,
    deleteTileSetImage,
    getRelatedTileSets,
    deleteTileMap
}