import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Button,
  Container,
  Spinner,
} from "@chakra-ui/react";

const FormationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/formation/${id}`);
        setFormation(response.data);
      } catch (error) {
        console.error("Erreur de récupération des détails de la formation", error);
        navigate("/"); 
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!formation) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl" mb={4}>
          Formation non trouvée
        </Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg">
      <Button mt={4} mb={4} onClick={() => navigate(-1)}>
        Retour
      </Button>
      <VStack spacing={4} align="stretch">
        {formation.image && (
          <Image
            src={formation.image}
            alt={formation.titre}
            boxSize="400px"
            objectFit="cover"
            alignSelf="center"
          />
        )}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            {formation.titre}
          </Heading>
          <Text fontSize="lg" mb={2}>
            <strong>Objectif:</strong> {formation.objectif}
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>Description:</strong> {formation.description}
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>Compétences Acquises:</strong> {formation.competenceAquises}
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>Résultats Souhaités:</strong> {formation.resultatSouhaites}
          </Text>
        </Box>
        <Box>
          <Heading as="h3" size="lg" mb={2}>
            Niveaux
          </Heading>
          {formation.niveau && formation.niveau.length > 0 ? (
            formation.niveau.map((niveau, index) => (
              <Box key={index} mb={4}>
                <Heading as="h4" size="md" mb={2}>
                  {niveau.title}
                </Heading>
                {niveau.cours && niveau.cours.length > 0 ? (
                  niveau.cours.map((cours, coursIndex) => (
                    <Box key={coursIndex} pl={4} borderLeft="2px solid teal">
                      <Text fontSize="md" mb={1}>
                       {cours.nom}
                       
                      </Text>
                   
                    <Text fontSize="md" mb={1}>
                    {cours.description}
                     
                    </Text>
                  </Box>
                     
                  ))
                ) : (
                  <Text fontSize="md">Aucun cours disponible.</Text>
                )}
              </Box>
            ))
          ) : (
            <Text fontSize="md">Aucun niveau disponible.</Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default FormationDetails;
