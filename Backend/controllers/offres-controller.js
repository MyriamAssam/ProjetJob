// --- IMPORTS ---
const OFFRES = require("../models/offre");
const HttpError = require("../util/http-error");
const mongoose = require("mongoose");

// --- GET TOUTES LES OFFRES ---
const getAllOffres = async (req, res, next) => {
  let offres;
  try {
    offres = await OFFRES.find().exec();
    if (!offres || offres.length == 0) {
      return next(new HttpError("Aucune offre trouvée...", 404));
    }
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la récupération des offres, veuillez réessayer plus tard",
        500
      )
    );
  }
  res.json({ offres: offres.map((o) => o.toObject({ getters: true })) });
};


// --- GET SPECIFIC OFFRE ---
const getOffreById = async (req, res, next) => {
  const oId = req.params.oId;

  let offre;
  try {
    offre = await OFFRES.findById(oId);
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la récupération de la offre, veuillez réessayer plus tard.",
        500
      )
    );
  }

  if (!offre) {
    return next(new HttpError("Offre introuvable.", 404));
  }

  res.json({ offre: offre.toObject({ getters: true }) });
};

// --- GET TOUTES LES OFFRES D'UN USER ---
const getAllOffresEmployeur = async (req, res, next) => {
  const employeurId = req.params.employeurId;
  //OFFRES dun employeur
  // A CONTINUER
  let offresEmployeur;
  try {
    offresEmployeur = await OFFRES.find({ employeurId: employeurId });
  } catch (e) {
    // Vérifier si l'erreur provient du fait que l'utilisateur est introuvable
    if (e.kind == "ObjectId" && e.path == "employeurId") {
      return next(new HttpError("L'utilisateur est introuvable.", 404));
    }

    console.log(e);
    return next(
      new HttpError(
        "Échec lors de l'obtention des offres de l'utilisateur.",
        500
      )
    );
  }

  if (offresEmployeur?.length === 0) {
    return next(
      new HttpError(
        "Cet utilisateur n'a pas encore publié de offres ou il est introuvable.",
        404
      )
    );
  }

  res.json({
    offres: offresEmployeur.map((o) => o.toObject({ getters: true })),
  });
};

// --- RECHERCHE DE OFFRES ---
const findOffresByEmailOrTitre = async (req, res, next) => {
  const { employeurId, titre } = req.body;
  console.log(`EmployeurId: ${employeurId}, Nom: ${titre}`);

  let offres = [];
  try {
    if (employeurId && mongoose.isValidObjectId(employeurId)) {
      (await OFFRES.find({ employeurId: employeurId })).map((o) =>
        offres.push(o)
      );
    }
    if (titre && titre.length > 0) {
      if (offres.length > 0) {
        offres = offres.filter(
          (o) =>
            o.titre.toLowerCase() == titre.toLowerCase() ||
            o.titre.toLowerCase().includes(titre.toLowerCase()) ||
            titre.toLowerCase().includes(o.titre.toLowerCase())
        );
      } else {
        const allOffres = await OFFRES.find();
        const allOffresApresFiltre = allOffres.filter(
          (o) =>
            o.titre.toLowerCase() == titre.toLowerCase() ||
            o.titre.toLowerCase().includes(titre.toLowerCase()) ||
            titre.toLowerCase().includes(o.titre.toLowerCase())
        );
        allOffresApresFiltre.map((o) => {
          offres.push(o);
          console.log("Offre trouvée par titre: ", o);
        });
      }
    }
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la recherche de l'offres, veuillez réessayer plus tard.",
        500
      )
    );
  }

  if (offres.length == 0) {
    return next(
      new HttpError("Aucune offre ne correspond à ces filtres.", 404)
    );
  }

  res.json({ offres: offres.map((o) => o.toObject({ getters: true })) });
};

// --- AJOUT D'UNE OFFRE ---
const addOffre = async (req, res, next) => {
  const { titre, nomEmployeur, email, salaire, details, employeurId, published } = req.body;

  const newOffre = new OFFRES({
    titre,
    nomEmployeur,
    email,
    salaire,
    details,
    employeurId,
    published: published || false
  });

  try {
    await newOffre.save();
    res.status(201).json({ offre: newOffre.toObject({ getters: true }) });
  } catch (err) {
    return next(new HttpError("Adding offer failed, please try again.", 500));
  }
};



// --- MODIFICATION D'UNE OFFRE ---
const modifierOffre = async (req, res, next) => {
  const oId = req.params.oId;
  const modifications = req.body;

  try {
    const offreModifiee = await OFFRES.findByIdAndUpdate(oId, modifications, {
      new: true,
    });

    if (!offreModifiee) {
      return next(new HttpError("Offre introuvable.", 404));
    }

    res.status(201).json({ offre: offreModifiee.toObject({ getters: true }) });
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la modification de la offre, veuillez réessayer plus tard.",
        500
      )
    );
  }
};

// --- SUPPRESSION D'UNE OFFRE ---
const deleteOffre = async (req, res, next) => {
  const oId = req.params.oId;

  let offre;
  try {
    offre = await OFFRES.findByIdAndDelete(oId);

    if (!offre) {
      return next(new HttpError("Offre introuvable.", 404));
    }

    res.status(200).json({ message: "La offre a été supprimée avec succès." });
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la suppression de l'offre, veuillez réessayer plus tard.",
        500
      )
    );
  }
};

// --- EXPORTS ---
exports.getAllOffres = getAllOffres;
exports.getOffreById = getOffreById;
exports.offresUser = getAllOffresEmployeur;
exports.recherche = findOffresByEmailOrTitre;

exports.addOffre = addOffre;
exports.majOffre = modifierOffre;
exports.supprimerOffre = deleteOffre;