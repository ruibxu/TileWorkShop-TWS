const user = require('./User.json')
const User = require('../models/user-model')
const { getLoggedIn, registerUser, loginUser, logoutUser, changePassword, updateAccount } = require('../controllers/auth-controller');
const auth = require('../auth/authManager')
const signToken = require('../auth/authManager')
const httpMock = require('node-mocks-http');
const request = require("supertest")
const baseURL = "https://tileworkshop.herokuapp.com"


describe("Testing auth", () => {
    // //   beforeAll(async () => {
    // //     // set up the todo

    // //   })
    afterAll(async () => {
        const fin = await request(baseURL).delete(`/auth/delete`)
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
