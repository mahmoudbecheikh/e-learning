import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Stack,
    IconButton,
  } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const UpdateFormationForm = () => {
  const [formationData, setFormationData] = useState({
    titre: "",
    objectif: "",
    description: "",
    competenceAquises: "",
    resultatSouhaites: "",
    niveau: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const getFormation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/formation/${id}`);
        const data = response.data;
       
        const niveauWithCourses = data.niveau.map(niv => ({
          ...niv,
          courses: niv.courses || [] 
        }));
        setFormationData({ ...data, niveau: niveauWithCourses });
      } catch (error) {
        console.error('Erreur de récupération des données de formation', error);
      }
    };
    getFormation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNiveauChange = (index, value) => {
    const updatedNiveau = formationData.niveau.map((niv, i) =>
      i === index ? { ...niv, title: value } : niv
    );
    setFormationData(prevState => ({
      ...prevState,
      niveau: updatedNiveau
    }));
  };

  const handleCourseChange = (niveauIndex, courseIndex, value) => {
    const updatedNiveau = formationData.niveau.map((niv, i) => {
      if (i === niveauIndex) {
        const updatedCourses = niv.courses.map((course, j) =>
          j === courseIndex ? { ...course, title: value } : course
        );
        return { ...niv, courses: updatedCourses };
      }
      return niv;
    });
    setFormationData(prevState => ({
      ...prevState,
      niveau: updatedNiveau
    }));
  };

  const addNiveau = () => {
    setFormationData(prevState => ({
      ...prevState,
      niveau: [...prevState.niveau, { title: "", courses: [] }]
    }));
  };

  const addCourse = (niveauIndex) => {
    const updatedNiveau = formationData.niveau.map((niv, i) => {
      if (i === niveauIndex) {
        return { ...niv, courses: [...(niv.courses || []), { title: "" }] };
      }
      return niv;
    });
    setFormationData(prevState => ({
      ...prevState,
      niveau: updatedNiveau
    }));
  };

  const deleteNiveau = (niveauIndex) => {
    const updatedNiveau = formationData.niveau.filter((_, i) => i !== niveauIndex);
    setFormationData(prevState => ({
      ...prevState,
      niveau: updatedNiveau
    }));
  };

  const deleteCourse = (niveauIndex, courseIndex) => {
    const updatedNiveau = formationData.niveau.map((niv, i) => {
      if (i === niveauIndex) {
        const updatedCourses = niv.courses.filter((_, j) => j !== courseIndex);
        return { ...niv, courses: updatedCourses };
      }
      return niv;
    });
    setFormationData(prevState => ({
      ...prevState,
      niveau: updatedNiveau
    }));
  };

  const updateFormation = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/formation/${id}`, formationData);
      navigate('/listformations');
    } catch (error) {
      console.error('Erreur de mise à jour de la formation', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={5}>Modifier une formation</Heading>
      <form onSubmit={updateFormation}>
        <FormControl mb={3}>
          <FormLabel htmlFor="titre">Titre</FormLabel>
          <Input type="text" name="titre" value={formationData.titre} onChange={handleChange} placeholder="Titre" />
        </FormControl>
        
        <FormControl mb={3}>
          <FormLabel htmlFor="objectif">Objectif</FormLabel>
          <Input type="text" name="objectif" value={formationData.objectif} onChange={handleChange} placeholder="Objectif" />
        </FormControl>
        
        <FormControl mb={3}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea name="description" value={formationData.description} onChange={handleChange} placeholder="Description" />
        </FormControl>
        
        <FormControl mb={3}>
          <FormLabel htmlFor="competenceAquises">Compétences Acquises</FormLabel>
          <Input type="text" name="competenceAquises" value={formationData.competenceAquises} onChange={handleChange} placeholder="Compétences Acquises" />
        </FormControl>
        
        <FormControl mb={3}>
          <FormLabel htmlFor="resultatSouhaites">Résultats Souhaités</FormLabel>
          <Input type="text" name="resultatSouhaites" value={formationData.resultatSouhaites} onChange={handleChange} placeholder="Résultats Souhaités" />
        </FormControl>

        <Heading as="h3" size="md" mt={5} mb={3}>Niveaux</Heading>
        {formationData.niveau.map((niv, niveauIndex) => (
          <Box key={niveauIndex} mb={3} border="1px solid #ccc" p={3} borderRadius="md">
            <FormControl mb={3}>
              <FormLabel>Niveau {niveauIndex + 1}</FormLabel>
              <Input
                type="text"
                value={niv.title}
                onChange={(e) => handleNiveauChange(niveauIndex, e.target.value)}
                placeholder="Titre du Niveau"
              />
              <IconButton
                aria-label="Delete Niveau"
                icon={<DeleteIcon />}
                size="sm"
                ml={2}
                onClick={() => deleteNiveau(niveauIndex)}
              />
            </FormControl>
            <Stack spacing={3}>
              {(niv.courses || []).map((course, courseIndex) => (
                <FormControl key={courseIndex} mb={3}>
                  <FormLabel>Course {courseIndex + 1}</FormLabel>
                  <Input
                    type="text"
                    value={course.title}
                    onChange={(e) => handleCourseChange(niveauIndex, courseIndex, e.target.value)}
                    placeholder="Titre du Course"
                  />
                  <IconButton
                    aria-label="Delete Course"
                    icon={<DeleteIcon />}
                    size="sm"
                    ml={2}
                    onClick={() => deleteCourse(niveauIndex, courseIndex)}
                  />
                </FormControl>
              ))}
              <Button colorScheme="teal" size="sm" onClick={() => addCourse(niveauIndex)}>Ajouter un cours</Button>
            </Stack>
          </Box>
        ))}
        <Button colorScheme="teal" onClick={addNiveau}>Ajouter un niveau</Button>

        <Button colorScheme="blue" mt={5}  onClick={onOpen}>Mettre à jour</Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir mettre à jour cette formation ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateFormation}>
              Oui
            </Button>
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UpdateFormationForm;
