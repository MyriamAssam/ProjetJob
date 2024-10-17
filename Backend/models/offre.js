const mongoose = require("mongoose");
const offreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  nomEmployeur: { type: String, required: false },
  email: { type: String, required: true },
  salaire: { type: Number, required: false },
  details: { type: String, required: false },
  employeurId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  published: { type: Boolean, default: false },
});

module.exports = mongoose.model("Offre", offreSchema);
