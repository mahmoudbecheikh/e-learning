import React, { useState } from "react";
import axios from 'axios';

const AddFormationsForm = () => {
  const [formationData, setFormationData] = useState({
    formationId: "",
    titre: "",
    objectif: "",
    description: "",
    competenceAquises: "",
    resultatSouhaites: "",
    nbrNiveau: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationData(prevState => ({
      ...prevState,
      [name]: name === "nbrNiveau" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post('http://localhost:3000/formation', formationData);
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response) {
       
        console.error('Erreur d\'ajout de la formation:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      } else {
       
        console.error('Erreur d\'ajout de la formation:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-formation-form">
      <h2>Ajouter une formation</h2>
      <div>
        <label htmlFor="formationId">Id</label>
        <input
          type="text"
          name="formationId"
          value={formationData.formationId}
          onChange={handleChange}
          placeholder="formation id"
          className="form-control"
        />

        <label htmlFor="titre">Titre</label>
        <input
          type="text"
          name="titre"
          value={formationData.titre}
          onChange={handleChange}
          placeholder="Titre"
          className="form-control"
        />

        <label htmlFor="objectif">Objectif</label>
        <input
          type="text"
          name="objectif"
          value={formationData.objectif}
          onChange={handleChange}
          placeholder="Objectif"
          className="form-control"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formationData.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control"
        />

        <label htmlFor="competenceAquises">Compétences Acquises</label>
        <input
          type="text"
          name="competenceAquises"
          value={formationData.competenceAquises}
          onChange={handleChange}
          placeholder="Compétences Acquises"
          className="form-control"
        />

        <label htmlFor="resultatSouhaites">Résultats Souhaités</label>
        <input
          type="text"
          name="resultatSouhaites"
          value={formationData.resultatSouhaites}
          onChange={handleChange}
          placeholder="Résultats Souhaités"
          className="form-control"
        />

        <label htmlFor="nbrNiveau">Nombre des Niveaux</label>
        <input
          type="number"
          name="nbrNiveau"
          value={formationData.nbrNiveau}
          onChange={handleChange}
          placeholder="Nombre des Niveaux"
          className="form-control"
        />

        <button type="submit">Ajouter</button>
      </div>
    </form>
  );
};

export default AddFormationsForm;
