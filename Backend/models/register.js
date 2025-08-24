const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    type: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);