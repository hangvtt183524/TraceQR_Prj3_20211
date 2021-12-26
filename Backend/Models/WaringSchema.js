const mongoose = require('mongoose');

const WarningSchema = mongoose.Schema(
    {
        _idReference: String,
        _idPlace: String,
        message: String,
        createdDate: String,
        seen: Boolean
    }
);

module.exports = mongoose.model('Warning', WarningSchema);