require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, /* { expiresIn: '45s' } */);
}

function authenticateToken(req, res, next) {
    if (req.body.accessToken) {
        const token = req.body.accessToken;

        if (token == null) return res.status(200).json({ code: "14", message: "Expired or Invalid token"});
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, currentUser) => {
            //console.log(err);
            if (err) return res.status(200).json({ code: "13", message: "Token invalid" });
            req.currentUser = currentUser;
            next();
        });
    }
    
}

module.exports = { generateAccessToken, authenticateToken };
