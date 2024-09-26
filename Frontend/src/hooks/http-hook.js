import { useState, useCallback } from "react";

//gerer notre loading et error ici...
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  on utilise useCallback pour eviter de boucler a l'infini dans notre methode
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      console.log("URL: ", url);
      setIsLoading(true);
      try {
        headers = {
          "Content-Type": "application/json",
          ...headers,
        };

        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };
  //retourner un objet contenant le isloading, l'erreur, la fonction sendRequest et la fonction clearError
  return { isLoading, error, sendRequest, clearError };
};
