// --- IMPORTS ---
const express = require("express");
const offreController = require("../controllers/offres-controller");
const checkAuth = require("../middleware/check-auth");

// --- ROUTES ---
const router = express.Router();

router.get("/", offreController.getAllOffres);
router.get("/find/:oId", offreController.getOffreById);
router.get("/profile/:userId", offreController.offresUser);

router.post("/find", offreController.recherche);

// Routes accessibles seulement si connecté
router.use(checkAuth);
router.post("/", offreController.addOffre);
router.put("/:oId", offreController.majOffre);
router.delete("/:oId", offreController.supprimerOffre);

// --- EXPORTS ---
module.exports = router;