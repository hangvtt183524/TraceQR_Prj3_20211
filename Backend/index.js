const express = require('express');
const qr = require("qrcode");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    const qr_text = qr.toDataURL("testing data", (err, src) => {
        if (err) res.send("Error");
        res.send("<html> <body> <img src=\"" + src + "\" /> </body> </html>");
    });
});

app.listen(PORT, () => {
    console.log("Server is running...");
});

