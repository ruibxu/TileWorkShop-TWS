const user = require('./User.json')
const { getLoggedIn, registerUser, loginUser, logoutUser, changePassword, updateAccount } = require('../controllers/auth-controller');




describe("Auth controller tests", () => {
    test('register user success', () => {
        // arrange and act
        var result = registerUser(user);

        // assert
        expect(result).toBe(result.jsonMatching({
            success: true,
            user: {
                username,
                email
            }
        }));
    });


})