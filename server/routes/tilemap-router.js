const express = require('express')
const router = express.Router()
const auth = require('../auth')
const TileMapController = require('../controllers/tilemap-controller')

//Queries
router.get('/tilemap/:id', auth.verify, TileMapController.getTileMapById)
router.get('/tilemap', auth.verify, TileMapController.getTileMapsByValue)

//mutations
router.post('/tilemap', auth.verify, TileMapController.createTileMap)
router.put('/tilemap/:id', auth.verify, TileMapController.updateTileMap)
router.delete('/tilemap/:id', auth.verify, TileMapController.deleteTileMap)

module.exports = router