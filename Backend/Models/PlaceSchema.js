const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema(
    {
        password: String,
        email: String,
        name: String,
        address: String,
        location: {
            latitude: String,
            longitude: String
        },
        phoneNumber: String,
        accessToken: String,
        createdQRDate: Date,
        isLoginPC: Boolean,
        isLoginPhone: Boolean,
        uuidPC: String,
        uuidPhone: String
    }
);

module.exports = mongoose.model('Place', PlaceSchema);