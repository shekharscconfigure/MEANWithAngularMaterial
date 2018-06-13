var mongoose = require('mongoose');
var bcrypt = require('bcrypt');



// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    roles: {
        type: [],
        default: ['accountant']
    },
    createdBy: {
        type: String
    },
    lastModifiedBy: {
        type: String
    },
    createdDate: {
        type: Date
    },
    updatedOn: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                user.updatedOn = currentDate
                if (!user.createdDate)
                    user.createdDate = currentDate;
                next();
            });
        });
    } else {
        user.updatedOn = currentDate
        if (!user.createdDate)
            user.createdDate = currentDate;
        return next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err, false);
        }
        cb(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);  