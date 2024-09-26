import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const [error, SetError] = useState(null);

    async function authSubmitHandler(event) {
        event.preventDefault();
        const inputs = new FormData(event.target);
        const data = Object.fromEntries(inputs.entries());
        console.log("data ", data);
        event.target.reset();
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log("asd", response);
            const responseData = await response.json();
            console.log("1", responseData);
            auth.login(responseData.userId, responseData.token);
            if (responseData.userId !== undefined) {
                navigate("/offres");
            }
            console.log("a");

        } catch (err) {
            SetError(err.message || "une erreur");
            console.log(err);
        }
    }


    /*
    const handleLogin = (e) => {
        e.preventDefault();

    // Logique d'authentification (à implémenter)
    const isAuthenticated = true; // Remplacer par la vraie logique d'authentification

        if (isAuthenticated) {
            if (type === "Candidat") {
                // Redirige vers la page des offres si l'utilisateur est un candidat
                navigate("/offres");
            } else if (type === "Employeur") {
                // Redirige vers la page d'ajout d'offre si l'utilisateur est un employeur
                navigate("/add-offer");
            }
        } else {
            console.log("Échec de la connexion");
        }
    }; */

    return (
        <form onSubmit={authSubmitHandler}>
            <div>
                <label>Email :</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Mot de passe :</label>
                <input type="password" name="mdp" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Type :</label>
                <input type="type" name="type" value={props.type} onChange={(e) => setType(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
