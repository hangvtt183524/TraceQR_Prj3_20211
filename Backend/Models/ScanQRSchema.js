const mongoose = require('mongoose');

const ScanQRSchema = mongoose.Schema(
    {
        _idReference: mongoose.ObjectID,
        QR: String,
        scanQRList: [
            {
                _idScanner: mongoose.ObjectID,
                timeScan: Date,
                locationScan: String
            }
        ]
    }
);

module.exports = mongoose.Model('ScanQR', ScanQRSchema);