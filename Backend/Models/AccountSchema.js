const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema(
    {
        email: String,
        password: String,
        userName: String,
        phoneNumber: String,
        accessToken: String,
        isLoginPC: Boolean,
        isLoginPhone: Boolean,
        uuidPC: String,
        uuidPhone: String
    }
);

module.exports = mongoose.model('Account', AccountSchema);