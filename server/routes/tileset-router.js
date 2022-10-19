const express = require('express')
const router = express.Router()
const auth = require('../auth')
const TileSetController = require('../controllers/tileset-controller')

//Queries
router.get('/tileset/:id', auth.verify, TileSetController.getTileSetById)
router.get('/tileset', auth.verify, TileSetController.getTileSetsByValue)

//mutations
router.post('/tileset', auth.verify, TileSetController.createTileSet)
router.put('/tileset/:id', auth.verify, TileSetController.updateTileSet)
router.delete('/tileset/:id', auth.verify, TileSetController.deleteTileSet)

module.exports = router