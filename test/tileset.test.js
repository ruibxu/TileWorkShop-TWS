const user = require('../test/User.json')
const request = require("supertest")
const baseURL = "https://tileworkshop.herokuapp.com"
let user_id = ''
let token = ''
const tileset = {
    "user_id": '',
    "data": {
        "name": "test",
        "height": "64",
        "width": "64",
        "pixel": "16"
    }
}
describe("Testing auth", () => {
    beforeAll(async () => {
        await request(baseURL).post("/auth/register").send(user);
        const login = await request(baseURL).post("/auth/login").send(user);
        user_id = login.body.user._id
        token = login.body.user.token
    })
    afterAll(async () => {
        await request(baseURL).delete(`/auth/delete`)
    })
    it("create tileset", async () => {
        tileset.user_id = user_id
        const response = await request(baseURL).post("/api/tileset")
        .set('Cookie', `token = ${token}`).send(tileset);
        expect(response.status).toBe(200);
    });
    it("delete tileset", async () => {
        tileset.user_id = user_id
        const response = await request(baseURL).delete(`/api/tileset/delete`)
        .set('Cookie', `token = ${token}`).send(tileset);
        expect(response.status).toBe(200);
    });

})
