require('dotenv').config();

const express = require('express');
const updateRoute = express.Router();
const StateSchema = require('../Models/StateSchema');
const WarningSchema = require('../Models/WaringSchema');
const ScanQRSchema = require('../Models/ScanQRSchema');
const AccountSchema = require('../Models/AccountSchema');
const PlaceSchema = require('../Models/PlaceSchema');
const mongoose = require('mongoose');
const { authenticateToken } = require('../Middleware/token');

updateRoute.post('/states/update_situation_only', authenticateToken, async (req, res) => {
    const { id, accessToken, state } = req.body;
    // console.log('state: ',state);
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        let dateNow = new Date();
        dateNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
        await StateSchema.create({ _idReference: id, typeState: state, createdDate: dateNow });

        if (state === 0 || state === 1) {
            const type = 'F' + state;
            let dateBefore = new Date(dateNow);
            dateBefore.setDate(dateBefore.getDate() - 7);
            dateBefore = dateBefore.getFullYear() + '-' + (dateBefore.getMonth() + 1) + '-' + dateBefore.getDate();
            // console.log(dateBefore)

            const listPlace = await ScanQRSchema.find({ _idScanner: id, dateScan: { $gte: dateBefore, $lte: dateNow }});
            if (listPlace !== null && listPlace.length > 0) {
                console.log(listPlace.length);
                for (let i=0; i<listPlace.length; i++) {
                    const listScannerEachPlace = await ScanQRSchema.find({ _idReference: listPlace[i]._idReference, dateScan: { $gte: dateBefore, $lte: dateNow }});
                    if (listScannerEachPlace !== null && listScannerEachPlace.length > 0) {
                        const warningSaves = [];
                        let aWarning;
                        for (let j=0; j<listScannerEachPlace.length; j++) {
                            console.log(listScannerEachPlace[j]);
                            aWarning = { 
                                _idReference: listScannerEachPlace[j]._idScanner,
                                _idPlace: listScannerEachPlace[j]._idReference,
                                message: "There was an " + type + " in this place. You had been there in " + listScannerEachPlace[j].dateScan,
                                createdDate: new Date(),
                                seen: false
                            };

                            warningSaves.push(aWarning);
                        }

                        await WarningSchema.create(warningSaves);
                    }
                    //console.log('each place: ', listScannerEachPlace);
                }
            }
            // console.log(listPlace);
        }
        return res.status(200).json({ code: "20", message: "OK" });
    }
});

updateRoute.post('/infos/get_infos', authenticateToken, async (req, res) => {
    const { id, accessToken, type } = req.body;
    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        if (type === 'private_user') {
            const currentInfo = await AccountSchema.findOne({ _id: id, accessToken: accessToken });
            if (currentInfo !== null) {
                res.status(200).json({ code: '20', message: 'OK', data: currentInfo });
            } else {
                return res.status(200).json({ code: "40a", message: "No data" });
            }
        } else if (type === 'public_place') {
            const currentInfo = await PlaceSchema.findOne({ _id: id });
            if (currentInfo !== null) {
                res.status(200).json({ code: '20', message: 'OK', data: currentInfo });
            } else {
                return res.status(200).json({ code: '40a', message: 'No data' });
            }
        } else {
            return res.status(200).json({ code: "50", message: "Something wrong! Please try again!"});
        }
    }
});

module.exports = updateRoute;