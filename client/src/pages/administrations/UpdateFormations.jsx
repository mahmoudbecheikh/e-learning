import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
const UpdateFormationForm=()=>{

    const [FormationData,setFormationData]=useState({
        formationId:"",
        titre:"",
        objectif:"",
        description:"",
        competenceAquises:"",
        resultatSouhaites:"",
        nbrNiveau:""

    });
    const {id}=useParams();

    useEffect(()=>{
        const getFormation=async()=>{
            try{
                const response=await axios.get(`http://localhost:3000/formation/${id}`);
                const FormationData=response.data;

                const updateFormation={

                    formationId:FormationData.formationId,
                    titre:FormationData.titre,
                    objectif:FormationData.objectif,
                    description:FormationData.description,
                    competenceAquises:FormationData.competenceAquises,
                    resultatSouhaites:FormationData.resultatSouhaites,
                    nbrNiveau:FormationData.nbrNiveau
                }

                setFormationData(updateFormation);
            }catch(error){
                console.error('Erreur de récupèration des données de formation');
            }
        };
        getFormation();
    },[id])

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormationData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };
    
    const update=async (e)=>{
        e.preventDefault();
         
        try{
            const formationResponse=await axios.put(`http://localhost:3000/formation/${id}`,FormationData);
            console.log(formationResponse.data);
        }catch(error){
            console.error('Erreur d\'ajout du formation',error);
        }


    }

    return (
        <form onSubmit={update} className="update-formation-form">
            <h2>Modifier une formation</h2>
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

                <button type="submit">Modifier</button>
             </div>
        </form>
    )
}
export default UpdateFormationForm;