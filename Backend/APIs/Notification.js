require('dotenv').config();

const express = require('express');
const nortifyRoute = express.Router();
const WarningSchema = require('../Models/WaringSchema');
const PlaceSchema = require('../Models/PlaceSchema');
const { authenticateToken } = require('../Middleware/token');

nortifyRoute.post('/nortifies/check_have_nortifies', authenticateToken, async (req, res) => {
    const { id, accessToken } = req.body;

    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        const notSeenNoftify = await WarningSchema.find({ _idReference: id, seen: false });
        //console.log(notSeenNoftify);
        if (notSeenNoftify !== null && notSeenNoftify.length > 0) {
            return res.status(200).json({ code: "20", message: "OK", count: notSeenNoftify.length });
        } else {
            return res.status(200).json({ code: "40a", message: "No warning", count: 0 });
        }     
    }
});

nortifyRoute.post('/nortifies/get_list_nortifies', authenticateToken, async (req, res) => {
    const { id, accessToken } = req.body;

    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        const notSeenNoftify = await WarningSchema.find({ _idReference: id, seen: false });
        //console.log(notSeenNoftify);
        if (notSeenNoftify !== null && notSeenNoftify.length > 0) {
            let listPlaces = [];
            for (let i=0; i<notSeenNoftify.length; i++) {
                let placeEle = {};
                let placeInfo;
                placeInfo = await PlaceSchema.findById(notSeenNoftify[i]._idPlace);
                //console.log('placeInfo: ', placeInfo);
                if (placeInfo !== null) {
                    placeEle.name = placeInfo.name;
                    placeEle.address = placeInfo.address;
                    placeEle.message = notSeenNoftify[i].message
                    placeEle._idNotify = notSeenNoftify[i]._id

                    listPlaces.push(placeEle);
                }
            }
            //console.log(listPlaces);
            return res.status(200).json({ code: "20", message: "OK", data: listPlaces });
        } else {
            return res.status(200).json({ code: "40a", message: "No warning" });
        }     

        return res.status(200).json({ code: "20", message: "OK" });
    }
});

nortifyRoute.post('/nortifies/get_list_nortifies_place', authenticateToken, async (req, res) => {
    const { id, accessToken } = req.body;

    if (id !== req.currentUser.id) return res.status(200).json({ code: "13", message: "Token invalid" });
    else {
        const notSeenNoftify = await WarningSchema.find({ _idReference: id, seen: false });
        console.log(notSeenNoftify);
        if (notSeenNoftify !== null && notSeenNoftify.length > 0) {
            let listUsers = [];
            for (let i=0; i<notSeenNoftify.length; i++) {
                let userEle = {};

                userEle.message = notSeenNoftify[i].message
                userEle._idNotify = notSeenNoftify[i]._id

                listUsers.push(userEle);
            }
            //console.log(listPlaces);
            return res.status(200).json({ code: "20", message: "OK", data: listUsers });
        } else {
            return res.status(200).json({ code: "40a", message: "No warning" });
        }     

        return res.status(200).json({ code: "20", message: "OK" });
    }
});

module.exports = nortifyRoute;