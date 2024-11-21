import React, { useState, useContext, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../components/context/AuthContext";

const ListeSoumission = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [soumissions, setSoumissions] = useState([]);

  useEffect(() => {
    if (auth.user == props.candidatId) {
      async function listeSoumissions() {
        try {
          const resSoumissions = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + `listeSoumissions/${props.id}`,
            "GET",
            null,
            { "Content-Type": "application/json" }
          );
          setSoumissions(resSoumissions.soumissions);
          console.log(soumissions);
        } catch (error) {
          console.log(error);
        }
      }
      listeSoumissions();
    } else {
      async function listeSoumissionsEmp() {
        try {
          const resSoumissions = await sendRequest(
            process.env.REACT_APP_BACKEND_URL +
              `listeSoumissions/liste/${auth.user}`,
            "GET",
            null,
            {
              "Content-Type": "application/json",
            }
          );
          setSoumissions(resSoumissions.soumissions);
          console.log(soumissions);
        } catch (error) {
          console.log(error);
        }
      }
      listeSoumissionsEmp();
    }
  });

  async function addSoumissionSubmitHandler(event) {
    console.log(props.emailEmployeur);

    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const newSoumission = {
      email: props.emailEmployeur,
      employeurId: auth.user,
      offreId: props.id,
      titreOffre: props.titre,
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "listeSoumissions/",
        "POST",
        JSON.stringify(newSoumission),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error(error);
    }
    console.log(JSON.stringify(newSoumission));
    event.target.reset();
  }
};

export default ListeSoumission;
