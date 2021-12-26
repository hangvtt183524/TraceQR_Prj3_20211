const mongoose = require('mongoose');

const StateSchema = mongoose.Schema(
    {
        _idReference: String,
        typeState: {
            type: Number,
            enum: [0, 1, 2]
        },
        createdDate: String
    }
);

module.exports = mongoose.model('State', StateSchema);