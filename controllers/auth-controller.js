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
        // console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                username: loggedInUser.username,
                email: loggedInUser.email,
                _id: loggedInUser._id,
                verified: user.authentication
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

//mutations
loginUser = async (req, res) => {
    // console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(201)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        // console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(201)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }
        // if(!existingUser.authentication){
        //     return res.status(401).json({errorMessage: "Account not verified."})
        // }
        // console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            // console.log("Incorrect password");
            return res
                .status(201)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        // console.log("token: " + token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                username: existingUser.username,
                email: existingUser.email,
                _id: existingUser._id,
                verified: user.authentication,
                token: token
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    // console.log("user logged out")
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).status(200).json({
        success: true,
    })
    // .send();
}

changePassword = async (req, res) => {
    // console.log("changing password");
    const { id, password, passwordVerify } = req.body;
    if (password.length < 8) {
        return res
            .status(400)
            .json({
                errorMessage: "Please enter a password of at least 8 characters."
            });
    }
    if (password !== passwordVerify) {
        return res
            .status(201)
            .json({
                errorMessage: "Please enter the same password twice."
            })
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "User not found"
            })
        }
        // console.log("passwordHash: " + passwordHash);
        user.passwordHash = passwordHash;
        user.save()
            .then(() => {
                // console.log("Success")
                return res.status(200).json({
                    success: true,
                    passwordHash: passwordHash
                })
            }).catch(error => {
                // console.log("Failure")
                return res.status(404).json({
                    success: false,
                    message: "Password not updated."
                })
            });
    });
}

updateAccount = async (req, res) => {
    try {
        const user_id = req.params.id;
        const { username, password, passwordVerify } = req.body;
        console.log("update account: " + username + " " + password + " " + passwordVerify);
        if (!user_id) {
            return res.status(201).json({ errorMessage: "No user exists" })
        }
        if (!username && !password && !passwordVerify) {
            return res
                .status(201)
                .json({ errorMessage: "No fields are entered" });
        }
        const user = await User.findOne({ _id: user_id }, (err, user) => {
            if (err) {
                return res.status(201).json({
                    err,
                    message: "User not found"
                })
            }
        });

        if (password && passwordVerify) {
            if (password.length < 8) {
                return res.status(201).json({errorMessage:"Please enter a password of at least 8 characters."});
            }
            if (password !== passwordVerify) {
                return res.status(201).json({errorMessage:"Please enter the same password twice."});
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, salt);
            user.passwordHash = passwordHash;
        }

        if (username) {
            const existingUser = await User.findOne({ username: username });
            if (existingUser) {
                return res.status(201).json({errorMessage:"An account with this username already exists."});
            } else {
                // console.log("new username: " + username);
                user.username = username;
            }
        }
        user.save().then(() => {
            return res.status(200).json({
                message: "Success",
                user: {
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    verified: user.authentication
                }
            });
        }).catch(err => {
            return res.status(201).json({
                errorMessage: "Failed"
            });
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

registerUser = async (req, res) => {
    try {
        const { username, email, password, passwordVerify } = req.body;
        console.log("create user: " + username + " " + email + " " + password + " " + passwordVerify);
        if (!username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        // console.log("all fields provided");
        if (password.length < 8) {
            console.log('password')
            return res.status(201).json({
                    success: false,
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        // console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        // console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        // console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const existingUser2 = await User.findOne({ username: username });
        // console.log("existingUser: " + existingUser2);
        if (existingUser2) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        // console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            _id: new ObjectId,
            username: username,
            email: email,
            passwordHash: passwordHash,
            authentication: false
        });

        const savedUser = await newUser.save();

        return res.status(200).json({
            user: {
                username: savedUser.username,
                email: savedUser.email, 
                _id: savedUser._id,
                verified: user.authentication
            },
            success: true
        })
        
        // console.log("new user saved: " + savedUser._id);

        // LOGIN THE USER
        /* const token = auth.signToken(savedUser._id);
        // console.log("token:" + token);

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
        })*/

        // console.log("token sent");

    } catch (err) {
        // console.error(err);
        res.status(500).send();
    }
}

forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        // console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "No Account with this email found"
                })
        }
        //Input whatever email needs here
        
        //#################################

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

verifyAccount = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne({ _id: user_id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "User not found"
            })
        }
        user.authentication = true
        user.save().then(() => {
            // console.log("SUCCESS!!!");
            return res.status(200).json({
                success: true,
                message: 'User Verified!',
                user: {
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    verified: user.authentication
                }
            })
        })
        .catch(error => {
            // console.log("FAILURE: " + JSON.stringify(error));
            return res.status(400).json({
                error,
                message: 'User not verified',
            })
        })
    });
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateAccount,
    verifyAccount,
    forgetPassword
}