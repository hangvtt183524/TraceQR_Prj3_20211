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

qrcodeRoute.post('/qrs/save_qr', authenticateToken, async (req, res) => {
    const { id, accessToken, qr } = req.body;
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        const datetime = new Date();
        const dateScan = datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getFullYear();
        const timeScan = datetime.getHours() + '/' + datetime.getMinutes() + '/' + datetime.getSeconds();

        const ref = await ScanQRSchema.findOne({ QR: qr });
        if (ref !== null) {
            await ScanQRSchema.create(
                { _idReference: ref._idReference, QR: qr, _idScanner: id, timeScan: timeScan, dateScan: dateScan, longitude: '', latitude: '' }
            );
        } else {
            await ScanQRSchema.create(
                { QR: qr, _idScanner: id, timeScan: timeScan, dateScan: dateScan, longitude: '', latitude: '' }
            );
        }

        return res.status(200).json({ code: "20", message: "OK" });
    }
});

qrcodeRoute.post('/qrs/list_qrs_place', authenticateToken, async (req, res) => {
    const { id, accessToken, datetime } = req.body;
    //console.log(datetime);
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        const listPlace = await ScanQRSchema.find({ _idScanner: id, dateScan: datetime });
        //console.log(listPlace);
        if (listPlace !== null && listPlace.length > 0) {
            return res.status(200).json({ code: "20", message: "OK", data: listPlace });
        } else {
            return res.status(200).json({ code: "40a", message: "No data information" });
        }
    }
});

module.exports = qrcodeRoute;