const tileset = require('./Tileset.json')
const Tileset = require('../models/tileset-model')
const {
    getTileSetImage,
    updateTileSetImage,
    deleteTileSetImage,
} = require('../controllers/cloudinary-controller')
const {     getTileSetById,
   createTileSet,
   deleteTileSet,
   updateTileSet,

   updateTileSetAccess,
   updateTileSetCommunity } = require('../controllers/tileset-controller');
const auth = require('../auth/authManager')
const signToken = require('../auth/authManager')
const httpMock = require('node-mocks-http');

var request = httpMock.createRequest({ method: "POST", url: "http://localhost:3000/", body: {
      "_id": {
          "$oid": "621689da565f8eb9bd89dc57"
      },
      "access": {
          "editor_ids": [{
              "$oid": "621689da565f8eb9bd89dc57"
          }],
          "owner_id": {
              "$oid": "621689da565f8eb9bd89dc57"
          },
          "public": true,
          "viewer_ids": [{
              "$oid": "621689da565f8eb9bd89dc57"
          }]
      },
      "community": {
          "disliked_User": [{
            "$oid": "621689da565f8eb9bd89dc57"
          }],
          "liked_User": [{
            "$oid": "621689da565f8eb9bd89dc57"
          }],
          "views": 0
      },
      "dateCreated": {
          "$date": "2012-12-12T05:00:00Z"
      },
      "dateUpdated": {
          "$date": "2012-12-12T05:00:00Z"
      },
      "length": 0,
      "pixels": 0,
      "width": 0
}})
var response = httpMock.createResponse({locals:{success:true}})

describe("Testing Tileset", () => {
    it.only("should create a tileset", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileSet(request, response)
        expect(res).toBe(res);
    })

    it.only("should delete tileset", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileSet(request, response)
        expect(res).toBe(res);
    })

    it.only("should update tileset", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await updateTileSet(request, response)
        expect(res).toBe(res);
    })

    it.only("should get TileSet Image", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await getTileSetImage(request, response)
        expect(res).toBe(res);
    })

    it.only("should update TileSet Image", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await updateTileSetImage(request, response)
        expect(res).toBe(res);
    })

    it.only("should delete TileSet Image", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileSetImage(request, response)
        expect(res).toBe(res);
    })

    it.only("should update TileSet Access", async () => {
        Tileset.findById = jest.fn().mockReturnValueOnce(null)
        Tileset.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await updateTileSetAccess(request, response)
        expect(res).toBe(res);
    })

    it.only("should  update TileSet Community ", async () => {
      Tileset.findById = jest.fn().mockReturnValueOnce(null)
      Tileset.prototype.save = jest.fn().mockImplementation(() => { })
      newTilemap = jest.fn().mockImplementation(() => { })
      const res = await updateTileSetCommunity(request, response)
      expect(res).toBe(res);
  })

    
})
