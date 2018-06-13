var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user');
var config = require('./main');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ userId: jwt_payload.userId }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {                
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};