require('dotenv').config();

const express = require('express');
const qrcodeRoute = express.Router();
const ScanQRSchema = require('../Models/ScanQRSchema');
const { authenticateToken } = require('../Middleware/token');



/* generate qr api */
qrcodeRoute.post('/qrs/generate_qr', authenticateToken, async (req, res) => {
    const { id, accessToken, qr } = req.body;
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        await ScanQRSchema.create({ _idReference: id, QR: qr, createdQRDate: new Date() });
        return res.status(200).json({ code: "20", message: "OK" });
    }
});

qrcodeRoute.post('qrs/save_qr', authenticateToken, async (req, res) => {
    const { id, accessToken, qr } = req.body;
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        await ScanQRSchema.create(
            { QR: qr, _idScanner: id, timeScan: new Date(), longitude: '', latitude: '' }
        );
        return res.status(200).json({ code: "20", message: "OK" });
    }
});

module.exports = qrcodeRoute;