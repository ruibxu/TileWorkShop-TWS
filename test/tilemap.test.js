const Tilemap = require('../models/tilemap-model')
const { getTileMapImage, updateTileMapImage, deleteTileMapImage } = require('../controllers/cloudinary-controller')
const { getTileMapById, createTileMap, deleteTileMap, updateTileMap, updateTileMapAccess,
    updateTileMapCommunity, addTileSetToTileMap, deleteTileSetfromTileMap } = require('../controllers/tilemap-controller');
const auth = require('../auth/authManager')
const signToken = require('../auth/authManager')
const httpMock = require('node-mocks-http');
const user = require('../test/User.json')
const request = require("supertest")
const baseURL = "https://tileworkshop.herokuapp.com"
let user_id = ''
let token = ''
const tilemap = {
    "user_id": '',
    "data": {
        "name": "test",
        "height": "64",
        "width": "64",
        "layers": [],
        "tileset": []
    }
}

let tid = ''
describe("Testing auth", () => {
    beforeAll(async () => {
        // set up the todo
        await request(baseURL).post("/auth/register").send(user);
        const login = await request(baseURL).post("/auth/login").send(user);
        user_id = login.body.user._id
        token = login.body.user.token
    })
    afterAll(async () => {
        await request(baseURL).delete(`/auth/delete`)
    })
    it("create tilemap", async () => {
        tilemap.user_id = user_id
        const response = await request(baseURL).post("/api/tilemap")
        .set('Cookie', `token = ${token}`).send(tilemap);
        tid = response.body.tileMap._id
        expect(response.status).toBe(200);
    });
    it("delete tilemap", async () => {
        tilemap.user_id = user_id
        const response = await request(baseURL).delete(`/api/tilemap/${tid}`)
        .set('Cookie', `token = ${token}`).send(tilemap);
        expect(response.status).toBe(200);
    });

})
