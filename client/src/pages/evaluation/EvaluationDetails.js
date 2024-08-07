import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GlobalContext } from '../../globalwrapper';

const EvaluationDetails = () => {
  const { id } = useParams(); // Assure-toi d'extraire l'ID correctement
  const { getEvaluationById } = useContext(GlobalContext);
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    if (id) { // Vérifie que l'ID est disponible
      getEvaluationById(id).then((response) => {
        setEvaluation(response);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [id, getEvaluationById]);

  if (!evaluation) {
    return (
      <Box p="6" textAlign="center">
        <Spinner size="xl" />
        <Text mt="4">Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p="6">
      <VStack spacing="4" align="start">
        <Heading>{evaluation.titre}</Heading>
        <Text><strong>Description:</strong> {evaluation.description}</Text>
        <Text><strong>Question:</strong> {evaluation.question}</Text>
        <Text><strong>Type:</strong> {evaluation.type}</Text>
        <Text><strong>Niveau ID:</strong> {evaluation.niveauId}</Text>
        <Text><strong>User ID:</strong> {evaluation.userId}</Text>
        <Text><strong>Score:</strong> {evaluation.score}</Text>
        <Text><strong>Validated:</strong> {evaluation.isValidated ? 'Yes' : 'No'}</Text>
        {/* <Button as={RouterLink} to={`/evaluations/${evaluation._id}/edit`} colorScheme="teal">
          Edit
        </Button> */}
         <Link to={`/evaluations/${id}/edit`}>
                    <Button colorScheme="teal">Edit</Button>
                </Link>
      </VStack>
    </Box>
  );
};

export default EvaluationDetails;
