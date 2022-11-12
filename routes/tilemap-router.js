const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const TileMapController = require('../controllers/tilemap-controller')

//Queries
router.get('/tilemap/:id', TileMapController.getTileMapById)
//router.get('/tilemap', auth.verify, TileMapController.getTileMapsByValue)

//mutations
router.post('/tilemap', auth.verify, TileMapController.createTileMap)
router.put('/tilemap/:id', auth.verify, TileMapController.updateTileMap)
router.delete('/tilemap/:id', auth.verify, TileMapController.deleteTileMap)

router.put('/tilemap/access/:id', auth.verify, TileMapController.updateTileMapAccess)
router.put('/tilemap/community/:id', auth.verify, TileMapController.updateTileMapCommunity)

router.put('/tilemap/set/:id', auth.verify, TileMapController.addTileSetToTileMap)
router.delete('/tilemap/set/:id', auth.verify, TileMapController.deleteTileSetfromTileMap)



module.exports = router