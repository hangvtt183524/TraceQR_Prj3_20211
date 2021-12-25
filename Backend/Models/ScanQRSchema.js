const mongoose = require('mongoose');

const ScanQRSchema = mongoose.Schema(
    {
        _idReference: String,
        QR: String,
        createdQRDate: Date,
        _idScanner: String,
        timeScan: Date,
        longitude: String,
        latitude: String
    }
);

module.exports = mongoose.model('ScanQR', ScanQRSchema);