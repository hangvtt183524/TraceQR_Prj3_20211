const mongoose = require('mongoose');

const ScanQRSchema = mongoose.Schema(
    {
        _idReference: String,
        QR: String,
        createdQRDate: Date,
        _idScanner: String,
        dateScan: String,
        timeScan: String,
        longitude: String,
        latitude: String
    }
);

module.exports = mongoose.model('ScanQR', ScanQRSchema);