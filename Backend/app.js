const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const offresRoutes = require("./routes/offres-routes");
const usersRoutes = require("./routes/users-routes");
const candidaturesRoutes = require("./routes/candidatures-routes");
const errorHandler = require("./handler/error-handler");

const app = express();

// CORS — autorise ton site Render + le local
app.use(
  cors({
    origin: [
      "https://projetjob-2.onrender.com", // Frontend prod
      "http://localhost:5173", // Dev (Vite) si besoin
      "http://localhost:3000", // Dev (CRA) si besoin
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// Répondre aux préflights partout
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/offres", offresRoutes);
app.use("/users", usersRoutes);
app.use("/candidatures", candidaturesRoutes);

// 404 + handler
app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});
app.use(errorHandler);

// ---- DB + serveur ----
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/RdvDb";

console.log("Mongo source:", process.env.MONGODB_URI ? "ENV" : "localhost");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () => console.log(`✅ API sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Erreur connexion MongoDB :", err.message);
    process.exit(1);
  });
