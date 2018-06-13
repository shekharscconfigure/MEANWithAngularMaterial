var jwt = require('jsonwebtoken');

// config files
var config = require('../../config/main');
var User = require('../../model/user');

var authenticationHelpers = {
    registerUser: function (req, res) {
        if (!req.body.userId || !req.body.password) {
            res.json({ success: false, message: 'Please enter email and password.' });
        } else {
            User.find({ userId: req.body.userId }, (errs, usersAvailable) => {
                if (errs) {
                    return res.json({ success: false, message: 'Something went wrong', error: errs });
                }
                if (usersAvailable.length > 0) {
                    return res.json({ success: false, message: 'That user Id already exists.' });

                } else {
                    var reqUser = req.user ? req.user.userId : "System";
                    var newUser = new User({
                        userId: req.body.userId,
                        password: req.body.password,
                        name: req.body.name,
                        mobileNumber: req.body.mobileNumber,
                        roles: req.body.roles,
                        lastModifiedBy: reqUser,
                        createdBy: reqUser
                    });

                    // Attempt to save the user
                    newUser.save(function (err) {
                        if (err) {
                            return res.json({ success: false, message: 'That user Id already exists.', error: err });
                        }
                        res.json({ success: true, message: 'Successfully created new user.' });
                    });
                }
            })

        }
    },
    authenticateUser: function (req, res) {
        User.findOne({
            userId: req.body.userId
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                // Check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // Create token if the password matched and no error was thrown
                        var token = jwt.sign({ userId: user.userId }, config.secret, {
                            expiresIn: 1 * 20 * 60 // in seconds(h*m*s)
                        });
                        res.json({ success: true, token: 'bearer ' + token });
                    } else {
                        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    }
                });
            }
        });
    },
    updateUser: function (req, res) {
        var user = req.body;
        var currentDate = new Date();

        User.findOne({ userId: user.userId }, (err, usr) => {
            if (err) {
                res.status(200).send(err)
            }
            if (usr) {
                usr.name = user.name;
                usr.password = user.password;



                usr.lastModifiedBy = req.user.userId;
                usr.lastUpdatedDate = currentDate;

                usr.save(function (err) {
                    if (err) {
                        return res.json({ success: false, message: 'Something went wrong while saving.', error: err });
                    }
                    return res.json({ success: true, message: 'Successfully updated the account.' });
                });
            } else {
                res.status(200).send("No data found");
            }
        });
    },
    deactivateUser: function (req, res) {
        var user = req.body;
        var currentDate = new Date();

        User.findOne({ userId: user.userId }, (err, usr) => {
            if (err) {
                res.status(200).send(err)
            }
            if (usr) {
                usr.isActive = false;

                usr.lastModifiedBy = req.user.userId;
                usr.lastUpdatedDate = currentDate;

                usr.save(function (err) {
                    if (err) {
                        return res.json({ success: false, message: 'Something went wrong while saving.', error: err });
                    }
                    return res.json({ success: true, message: 'Successfully updated the account.' });
                });
            } else {
                res.status(200).send("No data found");
            }
        });
    },
    getAllUsers: function (req, res) {
        var filter = { isActive: true };
        User.find(filter, (err, usrs) => {
            if (err) {
                res.status(200).send(err);
            } else {
                res.status(200).send(usrs);
            }
        });
    }
};
module.exports = authenticationHelpers;