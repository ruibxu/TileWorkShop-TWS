const auth = require('../auth/authManager')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongoose').Types.ObjectId;

//queries
getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                username: loggedInUser.username,
                email: loggedInUser.email
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

//mutations
loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                username: existingUser.username,
                email: existingUser.email
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    console.log("user logged out")
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).status(200).json({
        success: true,
    }).send();
}

changePassword = async (req, res) => {
    console.log("changing password");
    try {
        const { email, password } = req.body;
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        const existingUser = await User.findOne({ email: email });
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);
        existingUser.passwordHash = passwordHash;
        await existingUser.save();
        console.log(existingUser.passwordHash)
        return res.status(200).json({
            success: true,
            passwordHash: passwordHash
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

// updateAccount = async(req, res) => {
//     try{
//         console.log("updating account")
//         const { username, email, password, passwordVerify } = req.body;
//         if (!username || !email || !password || !passwordVerify) {
//             return res
//                 .status(400)
//                 .json({ errorMessage: "Please enter all required fields." });
//         }
//         console.log("all fields provided");
//         if (password.length < 8) {
//             return res
//                 .status(400)
//                 .json({
//                     errorMessage: "Please enter a password of at least 8 characters."
//                 });
//         }
//         console.log("password long enough");
//         if (password !== passwordVerify) {
//             return res
//                 .status(400)
//                 .json({
//                     errorMessage: "Please enter the same password twice."
//                 })
//         }
//         console.log("password and password verify match");
//         const existingUser = await User.findOne({ email: email });
//         console.log("existingUser: " + existingUser);
//         if (existingUser) {
//             return res
//                 .status(400)
//                 .json({
//                     success: false,
//                     errorMessage: "An account with this email address already exists."
//                 })
//         }

//         const saltRounds = 10;
//         const salt = await bcrypt.genSalt(saltRounds);
//         const passwordHash = await bcrypt.hash(password, salt);
//         console.log("passwordHash: " + passwordHash);




//     }catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }
// }

registerUser = async (req, res) => {
    try {
        const { username, email, password, passwordVerify } = req.body;
        console.log("create user: " + username + " " + email + " " + password + " " + passwordVerify);
        if (!username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            _id: new ObjectId,
            username: username,
            email: email,
            passwordHash: passwordHash,
            authentication: true
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);
        console.log("token:" + token);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                username: savedUser.username,
                email: savedUser.email
            }
        })

        console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    // updateAccount
}