const mongoose = require('mongoose');

const ScanQRSchema = mongoose.Schema(
    {
        _idReference: String,
        QR: String,
        createdQRDate: Date,
        scanQRList: [
            {
                _idScanner: String,
                timeScan: Date,
                locationScan: {
                    longtitude: String,
                    latitude: String
                }
            }
        ]
    }
);

module.exports = mongoose.model('ScanQR', ScanQRSchema);