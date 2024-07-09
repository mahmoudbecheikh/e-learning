import React, { useState } from "react";
import axios from 'axios';
const AddFormationsForm=()=>{

    const [FormationData,setFormationData]=useState({
        formationId:"",
        titre:"",
        objectif:"",
        description:"",
        competenceAquises:"",
        resultatSouhaites:"",
        nbrNiveau:""

    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormationData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };
    
    const Submit=async (e)=>{
        e.preventDefault();
         
        try{
            const formationResponse=await axios.post('http://localhost:3000/formation',FormationData);
            console.log(formationResponse.data);
        }catch(error){
            console.error('Erreur d\'ajout du formation',error);
        }


    }

    return (
        <form onSubmit={Submit} className="add-formation-form">
            <h2>Ajouter une formation</h2>
             <div>
                <label htmlFor="formationId">Id</label>
                <input type="text" name="formationId" value={FormationData.formationId} onChange={handleChange} placeholder="formation id" className="form-control" />

                <label htmlFor="titre">Titre</label>
                <input type="text" name="titre" value={FormationData.titre} onChange={handleChange} placeholder="Titre" className="form-control" />

                <label htmlFor="objectif">Objectif</label>
                <input type="text" name="objectif" value={FormationData.objectif} onChange={handleChange} placeholder="objectif" className="form-control" />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={FormationData.description} onChange={handleChange} placeholder="description" className="form-control" />

                <label htmlFor="competenceAquises">competence Aquises</label>
                <input type="text" name="competenceAquises" value={FormationData.competenceAquises} onChange={handleChange} placeholder="competence Aquises" className="form-control" />

                <label htmlFor="resultatSouhaites">resultat Souhaites</label>
                <input type="text" name="resultatSouhaites" value={FormationData.resultatSouhaites} onChange={handleChange} placeholder="resultat Souhaites" className="form-control" />

                <label htmlFor="nbrNiveau">Nombre des Niveaux</label>
                <input type="number" name="nbrNiveau" value={FormationData.nbrNiveau} onChange={handleChange} placeholder="Nombre des Niveaux" className="form-control" />

                <button type="submit">Ajouter</button>
             </div>
        </form>
    )
}
export default AddFormationsForm;