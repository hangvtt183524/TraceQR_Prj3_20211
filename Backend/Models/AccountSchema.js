const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema(
    {
        CCCD: Number,
        email: String,
        password: String,
        userName: String,
        phoneNumber: Number,
        accessToken: String,
        createdQRDate: Date,
        isLogin: Boolean,
        uuid: String
    }
);

module.exports = mongoose.Model('Account', AccountSchema);