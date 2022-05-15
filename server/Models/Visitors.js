const mongoose = require("mongoose");

const visitor_schema = new mongoose.Schema({
    name: String,
    email: String,
    register_number: String,
    registerBy: String,
    isVisiting: false,
});

module.exports = mongoose.model("visitors", visitor_schema);
