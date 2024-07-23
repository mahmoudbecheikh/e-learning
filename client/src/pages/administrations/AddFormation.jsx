import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  Stack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const AddFormationsForm = () => {
  const [formationData, setFormationData] = useState({
    titre: "",
    objectif: "",
    description: "",
    competenceAquises: "",
    resultatSouhaites: "",
    nbrNiveau: 0,
    niveau: [],
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.formationData) {
      setFormationData(location.state.formationData);
      if (location.state.niveauIndex !== undefined && location.state.newCourse) {
        handleCoursAdded(location.state.niveauIndex, location.state.newCourse);
      }
    }
  }, [location.state]);

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
      niveau: [...prevState.niveau, { title: "", cours: [] }],
      nbrNiveau: prevState.nbrNiveau + 1,
    }));
  };

  const handleRemoveNiveau = (index) => {
    setFormationData((prevState) => {
      const niveau = prevState.niveau.filter((_, i) => i !== index);
      return {
        ...prevState,
        niveau,
        nbrNiveau: prevState.nbrNiveau - 1,
      };
    });
  };

  const handleNiveauChange = (index, value) => {
    setFormationData((prevState) => {
      const niveau = prevState.niveau.map((niv, i) =>
        i === index ? { ...niv, title: value } : niv
      );
      return {
        ...prevState,
        niveau,
      };
    });
  };

  const handleAddCours = (niveauIndex) => {
    navigate(`/cours/add/${niveauIndex}`, { state: { formationData } });
  };

  const handleCoursAdded = (niveauIndex, newCours) => {
    setFormationData((prevState) => {
      const niveau = prevState.niveau.map((niv, i) =>
        i === niveauIndex ? { ...niv, cours: [...niv.cours, newCours] } : niv
      );
      return {
        ...prevState,
        niveau,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/formation", formationData);
      console.log("Response:", response.data);
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
          <Box as="label" htmlFor="niveau">
            Niveaux
          </Box>
          {formationData.niveau.map((niv, index) => (
            <Box key={index} className="niveau-entry" mb={4}>
              <HStack spacing={4} alignItems="center">
                <Input
                  type="text"
                  name={`niveau-${index}`}
                  value={niv.title}
                  onChange={(e) => handleNiveauChange(index, e.target.value)}
                  placeholder={`Niveau ${index + 1} Titre`}
                  size="sm"
                />
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveNiveau(index)}
                />
              </HStack>
              <Button
                mt={2}
                size="sm"
                colorScheme="teal"
                onClick={() => handleAddCours(index)}
              >
                Ajouter Cours
              </Button>
              {niv.cours.map((cours, coursIndex) => (
                <Box key={coursIndex} mt={2} pl={4} borderLeft="2px solid teal">
                  <Input
                    type="text"
                    placeholder="Nom du cours"
                    value={cours.nom}
                    readOnly
                    size="sm"
                  />
                </Box>
              ))}
            </Box>
          ))}
          <Button colorScheme="teal" size="sm" onClick={handleAddNiveau}>
            Ajouter Niveau
          </Button>
        </Stack>
        <FormControl>
          <FormLabel htmlFor="nbrNiveau">Nombre des Niveaux</FormLabel>
          <NumberInput name="nbrNiveau" value={formationData.nbrNiveau} readOnly isDisabled>
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <Button type="submit" colorScheme="blue" variant="solid">
          Ajouter
        </Button>
      </Stack>
    </Box>
  );
};

export default AddFormationsForm;
