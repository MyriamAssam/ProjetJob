const mongoose = require("mongoose");

const offreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  email: { type: String, required: true }, //email de l'employeur
  employeurId: { type: mongoose.Types.ObjectId, required: true, ref: "User" }, //le _id du user (peut voir dans bd)
});

module.exports = mongoose.model("Offre", offreSchema);