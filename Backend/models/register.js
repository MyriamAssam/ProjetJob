const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    mdp: { type: String, required: true },
    type: { type: String, required: true }, // "client" | "employé" | "candidat"
  },
  { timestamps: true, collection: "register" } // name the collection exactly
);

module.exports = mongoose.model("Register", registerSchema);
