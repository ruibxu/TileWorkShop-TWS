const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const TileMapController = require('../controllers/tilemap-controller')

//Queries
router.get('/tilemap/:id', auth.verify, TileMapController.getTileMapById)
router.get('/tilemap/image/:id', auth.verify, TileMapController.getTileMapImage)
//router.get('/tilemap', auth.verify, TileMapController.getTileMapsByValue)

//mutations
router.post('/tilemap', auth.verify, TileMapController.createTileMap)
router.put('/tilemap/:id', auth.verify, TileMapController.updateTileMap)
router.delete('/tilemap/:id', auth.verify, TileMapController.deleteTileMap)

router.put('/tilemap/image/:id', auth.verify, TileMapController.updateTileMapImage)
router.delete('/tilemap/image/:id', auth.verify, TileMapController.deleteTileMapImage)

router.put('/tilemet/access/:id', auth.verify, TileMapController.updateTileMapAccess)





module.exports = router