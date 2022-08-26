// String location;
//     int status;
//     double latitude;
//     double longitude;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dustbinSchema = new Schema({
    bin_id: {
        type: String,
        required: true

    },
    bin_name: {
        type: String,
        // required: true

    },
    lat: {
        type: Number,
        // required: true
    },

    lon: {
        type: Number,
        // required: true
    },
});

module.exports = mongoose.model('Dustbin', dustbinSchema);