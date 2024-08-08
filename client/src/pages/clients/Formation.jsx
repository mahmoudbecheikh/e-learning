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
  Collapse,
} from "@chakra-ui/react";
import Messagesection from "../message";
import "./formation.css";

const Formation = () => {
  const { idFormation } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLevel, setOpenLevel] = useState(null); // État pour gérer le niveau ouvert
  const [showMessages, setShowMessages] = useState(false); // État pour afficher/cacher les messages
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/progress`, {
          params: {
            idUser: idUser,
            idFormation: idFormation,
          },
        });
        setProgress(response.data);
        setFormation(response.data.formation);
      } catch (error) {
        console.error(
          "Erreur de récupération des détails de la formation",
          error
        );
        setError(
          "Une erreur est survenue lors de la récupération des données."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [idFormation, navigate, idUser]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl" mb={4}>
          {error}
        </Heading>
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

  // Calculer les niveaux disponibles
  const completedLevels = (progress.completedNiveau || []).map((niveau) => ({
    ...niveau,
    type: "completed",
  }));

  const currentLevel = progress.niveauActually
    ? {
        ...progress.niveauActually,
        type: "current",
      }
    : null;

  const availableLevels = formation.niveau
    .filter(
      (niveau) =>
        !completedLevels.some((completed) => completed._id === niveau._id) &&
        (!currentLevel || currentLevel._id !== niveau._id)
    )
    .map((niveau) => ({
      ...niveau,
      type: "available",
    }));

  // Fusionner les niveaux en une seule liste
  const allLevels = [
    ...completedLevels,
    currentLevel,
    ...availableLevels,
  ].filter((level) => level); // Filtrer les valeurs nulles

  const handleLevelClick = (niveauId) => {
    setOpenLevel(openLevel === niveauId ? null : niveauId);
  };

  return (
    <Container className="main" maxW="container.lg" p={4}>
      <Button mt={4} mb={4} onClick={() => navigate(-1)} colorScheme="teal">
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
          {allLevels.length === 0 ? (
            <Text fontSize="md">Tous les niveaux sont accessibles.</Text>
          ) : (
            allLevels.map((niveau, niveauIndex) => (
              <Box key={niveauIndex} className="level-container">
                <Box
                  className="level-item"
                  onClick={() => handleLevelClick(niveau._id)}
                >
                  <Text flex="1">{niveau.title}</Text>
                  <i
                    className={`fa ${
                      niveau.type === "completed"
                        ? "fa-star completed-icon"
                        : niveau.type === "current"
                        ? "fa-check-circle current-icon"
                        : "fa-lock locked-icon"
                    }`}
                    style={{ fontSize: "24px" }} // Ajustez la taille des icônes selon vos besoins
                  ></i>
                </Box>
                <Collapse in={openLevel === niveau._id}>
                  {(niveau.type === "completed" || niveau.type === "current") &&
                  niveau.cours
                    ? niveau.cours.map((cours, coursIndex) => {
                        const isCompleted =
                          progress.completedCours.some(
                            (completedCoursItem) =>
                              completedCoursItem._id === cours._id
                          ) ||
                          progress.completedNiveau.some(
                            (completedNiveau) =>
                              completedNiveau._id === niveau._id
                          );

                        return (
                          <Box
                            key={coursIndex}
                            className="course-item"
                            onClick={() =>
                              navigate(`/cours/${cours._id}`, {
                                state: { isCompleted },
                              })
                            }
                          >
                            <Text flex="1">{cours.nom}</Text>
                            {niveau.type !== "completed" && ( // Ne pas afficher l'icône si le niveau est complet
                              <i
                                className={`fa ${
                                  isCompleted
                                    ? "fa-check completed-course-icon"
                                    : "fa-times incomplete-course-icon"
                                }`}
                                style={{ fontSize: "20px" }} // Ajustez la taille des icônes selon vos besoins
                              ></i>
                            )}
                          </Box>
                        );
                      })
                    : null}
                </Collapse>
              </Box>
            ))
          )}
        </Box>
      </VStack>
      {/* Icône de message */}
      <Box
        className="message-icon"
        onClick={() => setShowMessages(!showMessages)}
      >
        <i className="fa fa-envelope" style={{ fontSize: "30px" }}></i>
      </Box>
      {/* Section des messages */}
      {showMessages && <Messagesection />}

      {progress.finish && (
        <>
          <div class="congrats-card">
            <div class="congrats-icon">
              <i class="fa fa-trophy"></i>
            </div>
            <h1 class="congrats-title">Félicitations !</h1>
            <p class="congrats-message">
              Vous avez terminé votre formation avec succès.
            </p>
            <button class="congrats-button">Voir le certificat</button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Formation;
