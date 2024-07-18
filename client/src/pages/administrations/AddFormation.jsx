import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  Button,
  Stack,
  HStack,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const AddFormationsForm = () => {
  const [formationData, setFormationData] = useState({
    formationId: "",
    titre: "",
    objectif: "",
    description: "",
    competenceAquises: "",
    resultatSouhaites: "",
    nbrNiveau: 0,
    niveaux: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationData((prevState) => ({
      ...prevState,
      [name]: name === "nbrNiveau" ? Number(value) : value,
    }));
  };

  const handleAddNiveau = () => {
    setFormationData((prevState) => ({
      ...prevState,
      niveaux: [...prevState.niveaux, { title: "" }],
      nbrNiveau: prevState.nbrNiveau + 1,
    }));
  };

  const handleRemoveNiveau = (index) => {
    setFormationData((prevState) => {
      const niveaux = prevState.niveaux.filter((_, i) => i !== index);
      return {
        ...prevState,
        niveaux,
        nbrNiveau: prevState.nbrNiveau - 1,
      };
    });
  };

  const handleNiveauChange = (index, value) => {
    setFormationData((prevState) => {
      const niveaux = prevState.niveaux.map((niveau, i) =>
        i === index ? { ...niveau, title: value } : niveau
      );
      return {
        ...prevState,
        niveaux,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/formation", formationData);
      console.log("Response:", response.data);

      const formationId = response.data._id;
      for (const niveau of formationData.niveaux) {
        await axios.post(`http://localhost:5000/niveau`, {
          ...niveau,
          formation: formationId
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("Erreur d'ajout de la formation:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else {
        console.error("Erreur d'ajout de la formation:", error.message);
      }
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className="add-formation-form">
      <Box as="h2">Ajouter une formation</Box>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="formationId">Id</FormLabel>
          <Input
            type="text"
            name="formationId"
            value={formationData.formationId}
            onChange={handleChange}
            placeholder="formation id"
          />
        </FormControl>

      
        <FormControl isRequired>
          <FormLabel htmlFor="titre">Titre</FormLabel>
          <Input
            type="text"
            name="titre"
            value={formationData.titre}
            onChange={handleChange}
            placeholder="titre"
          />
        </FormControl>
         
       
        <FormControl isRequired>
          <FormLabel htmlFor="objectif">Objectif</FormLabel>
          <Input
            type="text"
            name="objectif"
            value={formationData.objectif}
            onChange={handleChange}
            placeholder="objectif"
          />
        </FormControl>

        
        <FormControl isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formationData.description}
            onChange={handleChange}
            placeholder="description"
          />
        </FormControl>

       
        <FormControl isRequired>
          <FormLabel htmlFor="competenceAquises">Compétences Acquises</FormLabel>
          <Input
            type="text"
            name="competenceAquises"
            value={formationData.competenceAquises}
            onChange={handleChange}
            placeholder="Compétences Acquises"
          />
        </FormControl>

        
        <FormControl isRequired>
          <FormLabel htmlFor="resultatSouhaites">Résultats Souhaités</FormLabel>
          <Input
            type="text"
            name="resultatSouhaites"
            value={formationData.resultatSouhaites}
            onChange={handleChange}
            placeholder="Résultats Souhaités"
          />
        </FormControl>
        

        
       


       
        <Stack spacing={2}>
  <Box as="label" htmlFor="niveaux">
    Niveaux
  </Box>
  {formationData.niveaux.map((niveau, index) => (
    <HStack key={index} spacing={4} alignItems="center" className="niveau-entry">
      <Input
        type="text"
        name={`niveau-${index}`} // Use a unique name for each level input
        value={niveau.title}
        onChange={(e) => handleNiveauChange(index, e.target.value)}
        placeholder={`Niveau ${index + 1} Titre`}
        size="sm"
      />
      <IconButton icon={<CloseIcon />} size="sm" colorScheme="red" onClick={() => handleRemoveNiveau(index)} />
    </HStack>
  ))}
  <Button colorScheme="teal" size="sm" onClick={handleAddNiveau}>
    Add Niveau
  </Button>
</Stack>
        <FormControl>
          <FormLabel htmlFor="nbrNiveau">Nombre des Niveaux</FormLabel>
          <NumberInput
            name="nbrNiveau"
            value={formationData.nbrNiveau}
            readOnly
            isDisabled 
           
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" variant="solid">
          Ajouter
        </Button>
      </Stack>
    </Box>
  );
};

export default AddFormationsForm;
