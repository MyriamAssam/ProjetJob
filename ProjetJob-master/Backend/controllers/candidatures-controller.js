// --- IMPORTS ---
const CANDIDATURES = require("../models/candidature");
const HttpError = require("../util/http-error");
const mongoose = require("mongoose");

// --- GET TOUTES LES CANDIDATURES ---
const getAllCandidatures = async (req, res, next) => {
  let candidatures;
  try {
    candidatures = await CANDIDATURES.find().exec();

    if (!candidatures || candidatures.length == 0) {
      return next(new HttpError("Aucune candidature trouvée...", 404));
    }
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la récupération des candidatures, veuillez réessayer plus tard",
        500
      )
    );
  }
  res.json({
    candidatures: candidatures.map((o) => o.toObject({ getters: true })),
  });
};

// --- GET SPECIFIC CANDIDATURE ---
const getCandidatureById = async (req, res, next) => {
  const oId = req.params.oId;

  let candidature;
  try {
    candidature = await CANDIDATURES.findById(oId);
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la récupération de la candidature, veuillez réessayer plus tard.",
        500
      )
    );
  }

  if (!candidature) {
    return next(new HttpError("Offre introuvable.", 404));
  }

  res.json({ candidature: candidature.toObject({ getters: true }) });
};

// --- GET TOUTES LES CANDIDATURES D'UNE OFFRE ---
const getAllCandidaturesOffre = async (req, res, next) => {
  const offreId = req.params.offreId;

  let candidaturesOffre;
  try {
    candidaturesOffre = await CANDIDATURES.find({ offreId: offreId }).select(
      "email candidatId status"
    );
  } catch (e) {
    if (e.kind == "ObjectId" && e.path == "offreId") {
      return next(new HttpError("L'offre est introuvable.", 404));
    }

    console.log(e);
    return next(
      new HttpError(
        "Échec lors de l'obtention des candidatures de l'offre.",
        500
      )
    );
  }

  if (candidaturesOffre?.length === 0) {
    return next(
      new HttpError(
        "Cette offre n'a pas encore de candidatures ou il est introuvable.",
        404
      )
    );
  }

  res.json({
    candidatures: candidaturesOffre.map((o) => o.toObject({ getters: true })),
  });
};
// --- GET TOUTES LES CANDIDATURES D'UN CANDIDAT ---
const getAllCandidaturesCandidat = async (req, res, next) => {
  const candidatId = req.params.candidatId;

  let candidaturesCandidat;
  try {
    candidaturesCandidat = await CANDIDATURES.find({ candidatId: candidatId }).select(
      "email offreId titre status candidatId"
    );
    console.log("Candidatures pour le candidat :", candidaturesCandidat);
  } catch (e) {
    if (e.kind == "ObjectId" && e.path == "candidatId") {
      return next(new HttpError("Le candidat est introuvable.", 404));
    }

    console.log(e);
    return next(
      new HttpError(
        "Échec lors de l'obtention des candidatures du candidat.",
        500
      )
    );
  }

  if (candidaturesCandidat.length === 0) {
    return next(
      new HttpError(
        "Ce candidat n'a pas encore de candidatures ou il est introuvable.",
        404)
    );
  }

  res.json({
    candidatures: candidaturesCandidat.map((o) =>
      o.toObject({ getters: true })
    ),
  });
};

// --- RECHERCHE DE CANDIDATURES ---
const findCandidaturesByEmail = async (req, res, next) => {
  const { offreId, email } = req.body;
  console.log(`OffreId: ${offreId}, Email: ${email}`);

  let candidatures = [];
  try {
    if (offreId && mongoose.isValidObjectId(offreId)) {
      (await CANDIDATURES.find({ offreId: offreId })).map((o) =>
        candidatures.push(o)
      );
    }
    if (email && email.length > 0) {
      if (candidatures.length > 0) {
        candidatures = candidatures.filter(
          (o) =>
            o.email.toLowerCase() == email.toLowerCase() ||
            o.email.toLowerCase().includes(email.toLowerCase()) ||
            email.toLowerCase().includes(o.email.toLowerCase())
        );
      } else {
        const allCandidatures = await CANDIDATURES.find();
        const allCandidaturesApresFiltre = allOffres.filter(
          (o) =>
            o.email.toLowerCase() == email.toLowerCase() ||
            o.email.toLowerCase().includes(email.toLowerCase()) ||
            email.toLowerCase().includes(o.email.toLowerCase())
        );
        allCandidaturesApresFiltre.map((o) => {
          candidatures.push(o);
          console.log("Candidature trouvée par email: ", o);
        });
      }
    }
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la recherche des candidatures, veuillez réessayer plus tard.",
        500
      )
    );
  }

  if (candidatures.length == 0) {
    return next(
      new HttpError("Aucune candidature ne correspond à ces filtres.", 404)
    );
  }

  res.json({
    candidatures: candidatures.map((o) => o.toObject({ getters: true })),
  });
};

// --- AJOUT D'UNE CANDIDATURE ---
const addCandidature = async (req, res, next) => {
  const { email, offreId, titre, candidatId } = req.body;

  const candidature = new CANDIDATURES({
    email,
    offreId,
    titre,
    candidatId,
  });

  try {
    await candidature.save();
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la sauvegarde de la nouvelle candidature.",
        500
      )
    );
  }

  res
    .status(201)
    .json({ candidature: candidature.toObject({ getters: true }) });
};

// --- MODIFICATION D'UNE CANDIDATURE ---
const modifierCandidature = async (req, res, next) => {
  const cId = req.params.oId;
  const modifications = req.body;

  try {
    const candidatureModifiee = await CANDIDATURES.findByIdAndUpdate(
      cId,
      modifications,
      {
        new: true,
      }
    );

    if (!candidatureModifiee) {
      return next(new HttpError("Candidature introuvable.", 404));
    }

    res
      .status(201)
      .json({ candidature: candidatureModifiee.toObject({ getters: true }) });
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la modification de la candidature, veuillez réessayer plus tard.",
        500
      )
    );
  }
};

// --- SUPPRESSION D'UNE CANDIDATURE ---
const deleteCandidature = async (req, res, next) => {
  const cId = req.params.oId;

  let candidature;
  try {
    candidature = await CANDIDATURES.findByIdAndDelete(cId);

    if (!candidature) {
      return next(new HttpError("Candidature introuvable.", 404));
    }

    res
      .status(200)
      .json({ message: "La candidature a été supprimée avec succès." });
  } catch (e) {
    console.log(e);
    return next(
      new HttpError(
        "Échec lors de la suppression de la candidature, veuillez réessayer plus tard.",
        500
      )
    );
  }
};

// --- EXPORTS ---
exports.getAllCandidatures = getAllCandidatures;
exports.getCandidatureById = getCandidatureById;
exports.candidaturesOffre = getAllCandidaturesOffre;
exports.candidaturesCandidat = getAllCandidaturesCandidat;
exports.recherche = findCandidaturesByEmail;

exports.addCandidature = addCandidature;
exports.majCandidature = modifierCandidature;
exports.supprimerCandidature = deleteCandidature;
