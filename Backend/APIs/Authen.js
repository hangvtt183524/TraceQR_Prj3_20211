require('dotenv').config();

const express = require('express');
const authenRoute = express.Router();
const bcrypt = require('bcrypt');
const AccountSchema = require('../Models/AccountSchema');
const PlaceSchema = require('../Models/PlaceSchema');
const { generateAccessToken, authenticateToken } = require('../Middleware/token');

/* verify password */
const verifyPassword = async (acc, password) => {
    const validPassword = await bcrypt.compare(password, acc.password);
    return validPassword;
}

const loginAccount = async (acc, password, res, type) => {
    if (acc === null) return res.status(200).json({ code: "40a", message: "Account hasn't registed" });
    else if (!verifyPassword(acc, password)) return res.status(200).json({ code: "40", message: "wrong password" });
    else {
        const user = { id: acc._id };
        const accessToken = await generateAccessToken(user);

        const updateLogin = await AccountSchema.updateOne({ _id: acc._id }, { accessToken: accessToken });
        let userName;
        if (type === 'private_user') userName = acc.userName;
        else userName = acc.name;
        return res.status(200).json({ code: "20", message: "OK", data: {
                id: acc._id,
                userName: acc.userName,
                accessToken: accessToken
        }});
    }
}

/* api login */
authenRoute.post('/accounts/login', async (req, res) => {
    const { phoneNumber, email, password, type } = req.body;
    //console.log(phoneNumber, email, password);
    if (type === 'private_user') {
        try {
            if (phoneNumber && !email) {
                const acc = await AccountSchema.findOne({ phoneNumber: phoneNumber});
                //console.log(acc);
                loginAccount(acc, password, res, type);
            } else if (!phoneNumber && email) {
                const acc = await AccountSchema.findOne({ email: email});
                loginAccount(acc, password, res, type);
            } else {
                const acc = await AccountSchema.findOne({ phoneNumber: phoneNumber, email: email});
                loginAccount(acc, password, res, type);
            }
        } catch (err) {
            return res.status(500).json({ code: "50", message: "error database" });
        }
    } else if (type === 'public_place') {
        try {
            if (phoneNumber && !email) {
                const acc = await PlaceSchema.findOne({ phoneNumber: phoneNumber});
                //console.log(acc);
                loginAccount(acc, password, res, type);
            } else if (!phoneNumber && email) {
                const acc = await PlaceSchema.findOne({ email: email});
                loginAccount(acc, password, res, type);
            } else {
                const acc = await PlaceSchema.findOne({ phoneNumber: phoneNumber, email: email});
                loginAccount(acc, password, res, type);
            }
        } catch (err) {
            return res.status(500).json({ code: "50", message: "error database" });
        }
    } else {
        return res.status(200).json({ code: "50", message: "Something wrong! Please try again!"});
    }
});

/* api register */
authenRoute.post('/accounts/register', async (req, res) => {
    const { phoneNumber, email, userName, address, password, type, location } = req.body;

    if (type === 'Username') {
        try {
            const existAcc = await AccountSchema.findOne({ $or: [{ phoneNumber: phoneNumber }, { email: email }] });
            //console.log(existAcc);
            if (existAcc !== null) {
                return res.status(200).json({ code: "43", message: "account existed" });
            } else {
                const encodePassword = await bcrypt.hash(password, 10);
                const saveAccount = await AccountSchema.create({ phoneNumber: phoneNumber, email: email, userName: userName, password: encodePassword });
                //console.log(saveAccount);
                return res.status(200).json({ code: "20", message: "OK" });
    
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ code: "50", message: "error database" });
        }
    }
    else if (type === 'Address') {
        try {
            const existAcc = await PlaceSchema.findOne({ $or: [{ phoneNumber: phoneNumber }, { email: email }] });
            //console.log(existAcc);
            if (existAcc !== null) {
                return res.status(200).json({ code: "43", message: "account existed" });
            } else {
                const encodePassword = await bcrypt.hash(password, 10);
                const saveAccount = await PlaceSchema.create({ phoneNumber: phoneNumber, email: email, name: userName, address: address, password: encodePassword, location: location });
                //console.log(saveAccount);
                return res.status(200).json({ code: "20", message: "OK" });
    
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ code: "50", message: "error database" });
        }
    } else {
        return res.status(200).json({ code: "50", message: "Something wrong! Please try again!"});
    }
});

/* api logout */
authenRoute.post('/accounts/logout', authenticateToken, async (req, res) => {
    const { token } = req.body;

    try {
        await AccountSchema.updateOne({ _id: req.currentUser.id });
        return res.status(200).json({ code: "20", message: "OK" });
    } catch (err) {
        return res.status(500).json({ code: "50", message: "error database" });
    }
});

module.exports = authenRoute;