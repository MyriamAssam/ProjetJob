const express = require("express");
const userController = require("../controllers/users-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/find/:chaine", userController.findUser);
router.get("/allUsers", userController.getAllUsers);

// Routes accessibles seulement si connecté
//router.use(checkAuth);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.majUser);

// --- EXPORTS ---
module.exports = router;