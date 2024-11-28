const mongoose = require("mongoose");

const candidatureSchema = new mongoose.Schema({
  email: { type: String, required: true },
  offreId: { type: mongoose.Types.ObjectId, required: true, ref: "Offre" },
  titre: { type: String, required: true },
  candidatId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Candidature", candidatureSchema);
