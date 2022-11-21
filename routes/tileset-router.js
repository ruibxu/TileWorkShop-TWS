const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const TileSetController = require('../controllers/tileset-controller')

//Queries
router.get('/tileset/:id', TileSetController.getTileSetById)

//mutations
router.post('/tileset', auth.verify, TileSetController.createTileSet)
router.put('/tileset/:id', auth.verify, TileSetController.updateTileSet)
router.delete('/tileset/:id/:user_id', auth.verify, TileSetController.deleteTileSet)

router.put('/tileset/access/:id', auth.verify, TileSetController.updateTileSetAccess)
router.put('/tileset/community/:id', auth.verify, TileSetController.updateTileSetCommunity)
router.delete('/tileset/delete', auth.verify, TileSetController.deleteTest)
module.exports = router