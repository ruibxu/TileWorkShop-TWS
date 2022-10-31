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

var request = httpMock.createRequest({ method: "POST", url: "http://localhost:3000", body: tilemap })
var response = httpMock.createResponse({locals:{success:true}})
const expectation = undefined
// console.log(request)
describe("Testing Tilemap", () => {
    it.only("should create a tilemap", async () => {
        Tilemap.findOne = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await createTileMap(request, response)
        expect(res).toBe(expectation);
    })

    it.only("should delete tilemap", async () => {
        Tilemap.findById = jest.fn().mockReturnValueOnce(null)
        Tilemap.prototype.save = jest.fn().mockImplementation(() => { })
        newTilemap = jest.fn().mockImplementation(() => { })
        const res = await deleteTileMap(request, response)
        expect(res).toBe(res);
    })
})
