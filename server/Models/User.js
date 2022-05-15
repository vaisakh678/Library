const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    register_number: String,
    register_date: String,
    qr_delay: Number,
    smart_catching: Boolean,
    darkTheme: Boolean,
    password: String,
    type: String,
    disenable: false,
});

module.exports = mongoose.model("User", user_schema);
