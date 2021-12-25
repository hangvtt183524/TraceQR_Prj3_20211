require('dotenv').config();

const express = require('express');
const qrcodeRoute = express.Router();
const mongoose = require('mongoose');
const ScanQRSchema = require('../Models/ScanQRSchema');
const PlaceSchema = require('../Models/PlaceSchema');
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
        //console.log('ref: ', ref);
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

const findExactPlace = async (listPlace) => {
    let returnListPlace = [];
    if (listPlace !== null && listPlace.length > 0) {
        
        let element;
        for (let i=0; i<listPlace.length; i++) {
            const placeInfo = await PlaceSchema.findById(listPlace[i]._idReference);
            if (placeInfo !== null) {
                element = {
                    QR: listPlace[i].QR,
                    dateScan: listPlace[i].dateScan,
                    timeScan: listPlace[i].timeScan,
                    longitude: listPlace[i].longitude,
                    latitude: listPlace[i].latitude
                };
                element.name = placeInfo.name;
                element.address = placeInfo.address;
                element.location = placeInfo.location;

                returnListPlace.push(element);
                //console.log('return: ', returnListPlace);
            }
        }  
    } 
    return returnListPlace;
};

qrcodeRoute.post('/qrs/list_qrs_place', authenticateToken, async (req, res) => {
    const { id, accessToken, datetime } = req.body;
    //console.log(datetime);
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        const listPlace = await ScanQRSchema.find({ _idScanner: id, dateScan: datetime });
            const returnListPlace = await findExactPlace(listPlace);
            //console.log(returnListPlace);
            return res.status(200).json({ code: "20", message: "OK", data: returnListPlace });
        }
});

module.exports = qrcodeRoute;