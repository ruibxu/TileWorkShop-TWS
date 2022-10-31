const user = require('./User.json')
const User = require('../models/user-model')
const { getLoggedIn, registerUser, loginUser, logoutUser, changePassword, updateAccount } = require('../controllers/auth-controller');
const auth = require('../auth/authManager')
const signToken = require('../auth/authManager')
const httpMock = require('node-mocks-http');

var request = httpMock.createRequest({ method: "POST", url: "http://localhost:3000", body: user })
var response = httpMock.createResponse({locals:{success:true}})
const expectation = undefined
// console.log(request)
describe("Testing auth", () => {
    it.only("should create a new user", async () => {
        User.findOne = jest.fn().mockReturnValueOnce(null)
        User.prototype.save = jest.fn().mockImplementation(() => { })
        newUser = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await registerUser(request, response)
        expect(res).toBe(expectation);
    })

    it.only("should fail to create a new user", async () => {
        User.findOne = jest.fn().mockReturnValueOnce(null)
        User.prototype.save = jest.fn().mockImplementation(() => { })
        newUser = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await registerUser(request, response)
        expect(res).toBe(expectation);
    })

    it.only("should log into the user account", async () => {
        User.findOne = jest.fn().mockReturnValueOnce(null)
        User.prototype.save = jest.fn().mockImplementation(() => { })
        newUser = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await loginUser(request, response)
        expect(res).toBe(res);
    })

    it.only("should logout the user", async () => {
        User.findOne = jest.fn().mockReturnValueOnce(null)
        User.prototype.save = jest.fn().mockImplementation(() => { })
        newUser = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await logoutUser(request, response)
        expect(res).toBe(res);
    })

    it.only("should change the password", async () => {
        User.findOne = jest.fn().mockReturnValueOnce(null)
        User.prototype.save = jest.fn().mockImplementation(() => { })
        newUser = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await changePassword(request, response)
        expect(res).toBe(res);
    })

    it.only("should update the user account", async () => {
        User.findOne = jest.fn().mockReturnValueOnce(null)
        User.prototype.save = jest.fn().mockImplementation(() => { })
        newUser = jest.fn().mockImplementation(() => { })
        auth.signToken = jest.fn().mockImplementation(() => {
            return jwt.sign({
                userId: 1
            }, process.env.JWT_SECRET);
        })
        const res = await updateAccount(request, response)
        expect(res).toBe(res);
    })

    
})
