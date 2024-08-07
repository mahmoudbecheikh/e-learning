import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Spinner,
  useToast,
  Text,
  useDisclosure,
  Stack,
  Flex,
  Tooltip,
  VStack,
  Collapse,
} from '@chakra-ui/react';
import { GlobalContext } from '../../globalwrapper';
import EvaluationForm from './EvaluationForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const EvaluationsList = ({ niveauId,fetchEvaluations }) => {
  const { getEvaluationsByNiveauId, deleteEvaluation } = useContext(GlobalContext);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null); // État pour l'évaluation sélectionnée
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    getEvaluationsByNiveauId(niveauId)
      .then((response) => {
        setEvaluations(response.data);
      })
      .catch((error) => {
        toast({
          title: 'Failed to load evaluations.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [niveauId,fetchEvaluations, getEvaluationsByNiveauId, toast]);

  const handleDelete = (id) => {
    deleteEvaluation(id)
      .then(() => {
        setEvaluations(evaluations.filter((evaluation) => evaluation._id !== id));
        toast({
          title: 'Evaluation deleted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed to delete evaluation.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleAddEvaluation = () => {
    setSelectedEvaluation(null); // Reset the selected evaluation
    onOpen(); // Open the modal
  };

  const handleEditEvaluation = (evaluation) => {
    setSelectedEvaluation(evaluation); // Set the selected evaluation for editing
    onOpen(); // Open the modal
  };

  const handleModalClose = () => {
    onClose(); // Close the modal
    // Refresh the evaluations list
    getEvaluationsByNiveauId(niveauId)
      .then((response) => {
        setEvaluations(response.data);
      })
      .catch((error) => {
        toast({
          title: 'Failed to load evaluations.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  const handleToggleDetails = (evaluationId) => {
    setShowDetails((prev) => ({
        ...prev,
        [evaluationId]: !prev[evaluationId],
    }));
};

  return (
    <Box>
      <Heading size="md">Question-réponse</Heading>

      <Stack spacing={3}>
        {evaluations.length > 0 ? (
          evaluations.map((evaluation) => (
            <Box key={evaluation._id} p={4} shadow="md" borderWidth="1px" borderRadius="md">

            {/* <ListItem
              key={evaluation._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderWidth="1px"
              borderRadius="md"
              p="4"
            > */}
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold">{evaluation.titre}</Text>
              <Flex>
              <Tooltip label='modifier la question' bg={'green'}>
                <button onClick={() => handleEditEvaluation(evaluation)}>
                  <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '7px', width: '15px', color: 'green' }} />
                </button>
                </Tooltip>

                <Tooltip label='supprimer la question' bg={'red'}>

                  <button onClick={() => handleDelete(evaluation._id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '7px', width: '15px', color: 'red' }} />
                  </button>
                </Tooltip>
              </Flex>

              </Flex>
              <Box>
                {/* <Button
                  as={RouterLink}
                  to={`/evaluations/${evaluation._id}`}
                  colorScheme="teal"
                  mr="2"
                >
                  Voir plus
                </Button> */}

                            <Button
                                mt={2}
                                colorScheme="yellow"
                                onClick={() => handleToggleDetails(evaluation._id)}
                            >
                                {showDetails[evaluation._id] ? 'Réduire' : 'Voir plus'}
                            </Button>
                            <Collapse in={showDetails[evaluation._id]}>
                                <VStack align="start" spacing={2} mt={4}>
                                    <Text>Description: {evaluation.description}</Text>
                                    <Text>Question {evaluation.question}</Text>
                                </VStack>
                            </Collapse>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No evaluations added yet</Text>
        )}
      </Stack>

      {/* <Button onClick={handleAddEvaluation} mt="4" colorScheme="teal">
        Ajouter une nouvelle question
      </Button> */}

      <EvaluationForm
        isEdit={!!selectedEvaluation}
        evaluation={selectedEvaluation} // Pass the selected evaluation
        niveauId={niveauId}
        isOpen={isOpen}
        onClose={handleModalClose} // Pass the onClose handler
      />

    </Box>
  );
};

export default EvaluationsList;
