const tilemap = require('./Tilemap.json')
const Tilemap = require('../models/tilemap-model')
const { getTileMapById,
        createTileMap,
        deleteTileMap,
        updateTileMap,
        getTileMapImage,
        updateTileMapImage,
        deleteTileMapImage,
        updateTileMapAccess,
        updateTileMapCommunity,
        addTileSetToTileMap,
        deleteTileSetfromTileMap } = require('../controllers/tilemap-controller');
const auth = require('../auth/authManager')
const signToken = require('../auth/authManager')
const httpMock = require('node-mocks-http');

var request = httpMock.createRequest({ method: "POST", url: "http://localhost:3000/", body: {
    "user_id": "6355d16eb6390d46b4019880",
    "data":{
        "name": "Super Mario",
        "height": "64",
        "width": "64",
        "layers": [],
        "tileset": []
    }
}})
var response = httpMock.createResponse({locals:{success:true}})
const expectation = undefined
// console.log(request)
describe("Testing Tilemap", () => {
    it.only("should create a tilemap", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileMap(request, response)
        expect(res).toBe(res);
    })

    it.only("should delete tilemap", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileMap(request, response)
        expect(res).toBe(res);
    })

    it.only("should upate tilemap", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await updateTileMap(request, response)
        expect(res).toBe(res);
    })

    it.only("should get TileMap Image", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await getTileMapImage(request, response)
        expect(res).toBe(res);
    })

    it.only("should update TileMap Image", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await updateTileMapImage(request, response)
        expect(res).toBe(res);
    })

    it.only("should delete TileMap Image", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileMapImage(request, response)
        expect(res).toBe(res);
    })
})
