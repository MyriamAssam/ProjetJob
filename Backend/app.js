const express = require("express");
const mongoose = require("mongoose");
const offresRoutes = require("./routes/offres-routes");
const usersRoutes = require("./routes/users-routes");
const candidaturesRoutes = require("./routes/candidatures-routes");
const errorHandler = require("./handler/error-handler");

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Routes
app.use("/offres", offresRoutes);
app.use("/users", usersRoutes);
app.use("/candidatures", candidaturesRoutes);

// 404
app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

// Global error handler
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
