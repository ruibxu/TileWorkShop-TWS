const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const TileSetController = require('../controllers/tileset-controller')

//Queries
router.get('/tileset/:id', auth.verify, TileSetController.getTileSetById)
router.get('/tileset/image/:id', auth.verify, TileSetController.getTileSetImage)

//mutations
router.post('/tileset', auth.verify, TileSetController.createTileSet)
router.put('/tileset/:id', auth.verify, TileSetController.updateTileSet)
router.delete('/tileset/:id', auth.verify, TileSetController.deleteTileSet)

router.put('/tileset/image/:id', auth.verify, TileSetController.updateTileSetImage)
router.delete('/tileset/image/:id', auth.verify, TileSetController.deleteTileSetImage)

module.exports = router