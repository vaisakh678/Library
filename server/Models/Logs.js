const mongoose = require("mongoose");

const logs_schema = new mongoose.Schema({
    register_number: String,
    verifiedBy: String,
    checkin: Date,
    checkout: Date,
    status: String,
});

module.exports = mongoose.model("Logs", logs_schema);
