const { cloudinary } = require('../cloudinary');

//#----------------------------------------------TileMap's tileset images
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
        _id: public_id,
        resources: resources
    })
}

updateTileMapImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const filename = req.params.id;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'TileMap_Uses_Upload',
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
//#--------------------------------------------------------------Tilemap thumbnails
getTileMapThumbnail = async (req, res) => {
    const public_id = req.params.id;
    const search = `public_id:TileMap_Thumbnail/${public_id}`;
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

updateTileMapThumbnail = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const filename = req.params.id;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'TileMap_Thumbnail_Upload',
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

deleteTileMapThumbnail = async (req, res) => {
    const public_id = req.params.id;
    const search = `TileMap_Thumbnail/${public_id}`;
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
//#--------------------------------------------------------------Tileset Images
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
    getTileMapImage,
    updateTileMapImage,
    deleteTileMapImage,
    getTileMapThumbnail,
    updateTileMapThumbnail,
    deleteTileMapThumbnail,
    getTileSetImage,
    updateTileSetImage,
    deleteTileSetImage,
}