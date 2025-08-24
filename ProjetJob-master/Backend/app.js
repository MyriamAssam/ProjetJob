const express = require("express");
const mongoose = require("mongoose");
const offresRoutes = require("./routes/offres-routes");
const usersRoutes = require("./routes/users-routes");
const candidaturesRoutes = require("./routes/candidatures-routes");
const errorHandler = require("./handler/error-handler");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/offres", offresRoutes);
app.use("/users", usersRoutes);
app.use("/candidatures", candidaturesRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Use Atlas in production via env var
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/RdvDb";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on ${PORT}`);
    });
    console.log(`Connected to DB: ${MONGODB_URI}`);
  })
  .catch((e) => {
    console.error("DB connection failed:", e);
    process.exit(1);
  });
