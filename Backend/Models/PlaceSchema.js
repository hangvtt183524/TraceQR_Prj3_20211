const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema(
    {
        password: String,
        email: String,
        name: String,
        address: String,
        location: String,
        phoneNumber: Number,
        accessToken: String,
        createdQRDate: Date,
        isLogin: Boolean,
        uuid: String
    }
);

module.exports = mongoose.Model('Place', PlaceSchema);