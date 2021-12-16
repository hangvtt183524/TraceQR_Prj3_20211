require('dotenv').config();

const express = require('express');
const testRoute = express.Router();

testRoute.get('/test', async (req, res) => {
    return res.status(200).json("successfully test");
});

testRoute.get('/', (req, res) => {
    return res.status(200).json("done");
});

testRoute.post('/test/posta', (req, res) => {
    console.log(req.body.account);
    return res.status(200).json({ message: "post test successfully" });
});

module.exports = testRoute;