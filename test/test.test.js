const subtraction = require('./subtract');
test('subtracts 4 - 2 to equal 2', () => {
   expect(subtraction(4, 2)).toBe(2);
});

// const {getLoggedIn, registerUser, loginUser, logoutUser, changePassword, updateAccount} = require('./controllers/auth-controller');




//  describe("Auth controller tests", () => {
//    test('register user success', () => {
//    // arrange and act
//    var result = registerUser();
   
//    // assert
//    expect(result).toBe(6);
//    });
   
   
//    })