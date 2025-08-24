function errorHandler(err, req, res, next) {
    if (res.headerSent) {
      return next(error);
    }
  
    res.status(err.code || 500);
    res.json({ message: err.message || "Une erreur inconnue est survenue..." });
  }
  
  module.exports = errorHandler;
  