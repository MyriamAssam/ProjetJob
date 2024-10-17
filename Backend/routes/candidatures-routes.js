// --- IMPORTS ---
const express = require("express");
const candidatureController = require("../controllers/candidatures-controller");
const checkAuth = require("../middleware/check-auth");

// --- ROUTES ---
const router = express.Router();

router.get("/", candidatureController.getAllCandidatures);
router.get("/find/:cId", candidatureController.getCandidatureById);
router.get("/:offreId", candidatureController.candidaturesOffre);
router.get("/:candidatureId", candidatureController.candidaturesCandidat);

router.post("/find", candidatureController.recherche);

// Routes accessibles seulement si connecté
//router.use(checkAuth);
router.post("/", candidatureController.addCandidature);
router.put("/:oId", candidatureController.majCandidature);
router.delete("/:oId", candidatureController.supprimerCandidature);

// --- EXPORTS ---
module.exports = router;