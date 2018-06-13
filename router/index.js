
var express = require('express');

var routes = {
    route: function (passport) {
        var router = express.Router();
        var auth = require('../modules/auth/authentication');

        router.post('/api/v1/user/register', auth.registerUser);
        router.post('/api/v1/user/authenticate', auth.authenticateUser);

        //Test the Authentication
        router.get('/api/v1/user/login', passport.authenticate('jwt', { session: false }), function (req, res) {
            var userDetails = {
                userId: req.user.userId,
                name: req.user.name,
                email: req.user.email
            };
            res.send(userDetails);
        });


        return router;
    }
}
module.exports = routes;