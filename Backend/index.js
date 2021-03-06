const express = require('express');
const qr = require("qrcode");
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
//const testSchema = require('./Models/testSchema');
const authenRoute = require('./APIs/Authen');
const qrcodeRoute = require('./APIs/ScanQR');
const updateRoute = require('./APIs/AccessCoordinates');
const nortifyRoute = require('./APIs/Notification');

app.use(express.json());

/* app.get("/", (req, res) => {
    const qr_text = qr.toDataURL("testing data", (err, src) => {
        if (err) res.send("Error");
        res.send("<html> <body> <img src=\"" + src + "\" /> </body> </html>");
    });
});
 */

mongoose.connect('mongodb+srv://mgdb1:036300003200@cluster0.mwrff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    /* new testSchema({
        email: 'hang.vtt183524',
        name: 'vu thi thu hang'
    }).save(); */
}).catch(err => {
    console.log(err);
    console.log("Connection Error");
});

app.use(authenRoute);
app.use(qrcodeRoute);
app.use(updateRoute);
app.use(nortifyRoute);

app.listen(PORT, () => {
    console.log("Server is running...");
});

