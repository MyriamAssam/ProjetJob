const jwt = require("jsonwebtoken");
const HttpError = require("../util/http-error");

module.exports = (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }

    const token = req.headers.authorization.split(" ")[1]; // 'Bearer TOKEN'
    if (!token) {
      throw new Error("L'authentification a échoué.");
    }

    const tokenDecode = jwt.verify(token, "ProjetDeveloppment2024");
    req.userData = { userId: tokenDecode.userId };
    console.log("Validation de l'authentification: ", req.userData);

    next();
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de l'authentification, veuillez réessayer plus tard.",
        401
      )
    );
  }
};