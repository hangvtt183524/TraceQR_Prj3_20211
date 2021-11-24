const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema(
    {
        password: String,
        email: String,
        type: Number,
        typeName: String,
        name: String,
        address: String,
        location: String,
        phoneNumber: Number,
        accessToken: String,
        createdQRDate: Date,
        isLoginPC: Boolean,
        isLoginPhone: Boolean,
        uuidPC: String,
        uuidPhone: String
    }
);

module.exports = mongoose.Model('Place', PlaceSchema);