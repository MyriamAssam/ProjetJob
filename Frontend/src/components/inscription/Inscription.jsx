import './Inscription.css';

export default function Inscription(props) {

    return (
        <div className="inscription">  {/* Recoit en props le type de compte (candidat ou employeur), puis utiliser le if pour afficher l'interface correspondant */}

            {props.type == "Candidat" ? (
                <div className="form">
                
                    <h1>Inscrire en tant que Candidat</h1>

                    <form>
                        <div>
                            <div>
                                <label>Adresse courriel</label>
                                <input 
                                    type="text"
                                />
                            </div>
                            <div>
                            <label>Prénom</label>
                            <input 
                                type="text"
                            />
                            </div>
                            <div>
                            <label>Nom</label>
                            <input 
                                type="text"
                            />
                            </div>
                            <div>
                            <label>Mot de passe</label>
                            <input 
                                type="text"
                            />
                            </div>
                            <div>
                            <label>Confirmer mot de passe</label>
                            <input 
                                type="text"
                            />
                            </div>

                            <button type="submit">Créer</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                
                <h1>Inscrire en tant qu'Employeur</h1>

                <form>
                    <label>Adresse courriel</label>
                    <input type="text"/>
                    <button type="submit">Créer</button>

                </form>
            </div>
            )}
        </div>
        
    );
    
}