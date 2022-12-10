const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const CloudinaryController = require('../controllers/cloudinary-controller')

//Tileset owned Tilesets
router.get('/tileset/image/:id', CloudinaryController.getTileSetImage)
router.put('/tileset/image/:id', CloudinaryController.updateTileSetImage)
router.delete('/tileset/image/:id', CloudinaryController.deleteTileSetImage)

//Tilemap owned Tilesets
router.put('/tilemap/image/:id', CloudinaryController.updateTileMapImage)
router.delete('/tilemap/image/:id/:map_id', CloudinaryController.deleteTileMapImage)
router.get('/tilemap/image/:id', CloudinaryController.getTileMapImage)
router.get('/tilemap/allimage/:id', CloudinaryController.getRelatedTileSets)
router.delete('/tilemap/allImage/:id', CloudinaryController.deleteTileMap)

//Tilemap Thumbnails
router.put('/tilemap/thumbnail/:id', CloudinaryController.updateTileMapThumbnail)
router.delete('/tilemap/thumbnail/:id', CloudinaryController.deleteTileMapThumbnail)
router.get('/tilemap/thumbnail/:id', CloudinaryController.getTileMapThumbnail)

module.exports = router