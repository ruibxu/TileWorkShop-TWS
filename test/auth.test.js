const user = require('./User.json')
const request = require("supertest")
const baseURL = "https://tileworkshop.herokuapp.com"


describe("Testing auth", () => {
    afterAll(async () => {
        await request(baseURL).delete(`/auth/delete`)
    })
    it("register user", async () => {
        const response = await request(baseURL).post("/auth/register").send(user);
        expect(response.status).toBe(200);
    });
    it("login user", async () => {
        const response = await request(baseURL).post("/auth/login").send(user);
        expect(response.status).toBe(200);
    });
    it("logout user", async () => {
        const response = await request(baseURL).get("/auth/logout").send(user);
        expect(response.status).toBe(200);
    });
})
