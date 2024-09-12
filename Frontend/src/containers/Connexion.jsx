import Login from "../components/login/Login";
import { useState } from 'react';

export default function Connexion() {
    const [ typeCompte, setTypeCompte ] = useState("Candidat");

    return (
        <div>
            <div className="typeCompte">
                <a onClick={() => setTypeCompte("Candidat")}>Candidat</a>
                <a onClick={() => setTypeCompte("Employeur")}>Employeur</a>
            </div>

            <Login type={typeCompte}/>;
        </div>
        
    );
    
    
};