import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Spinner, Text, useToast, Stack, Flex, Collapse, Input, VStack, RadioGroup, Radio, Stack as ChakraStack } from '@chakra-ui/react';
import { GlobalContext } from '../../globalwrapper';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Passevaluation = () => {
  const { getEvaluationsByNiveauId, deleteEvaluation, getQuizzByNiveauId, handleDeleteQuizz, addReponseToEvaluation, setErrors } = useContext(GlobalContext);
  const [evaluations, setEvaluations] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState({});
  const [newReponse, setNewReponse] = useState('');
  const [validationResults, setValidationResults] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const toast = useToast();
  const { niveauId } = useParams();

  const [selectedQuizResponses, setSelectedQuizResponses] = useState({});
  const [userSelectedOption, setUserSelectedOption] = useState('');

// ... Plus tard dans le code
const handleOptionSelect = (option) => {
    setUserSelectedOption(option);
};


  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).sub : null; // Extraction de l'ID utilisateur du token JWT

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluationResponse = await getEvaluationsByNiveauId(niveauId);
        const quizResponse = await getQuizzByNiveauId(niveauId);

        setEvaluations(evaluationResponse.data);
        setQuizzes(quizResponse.data);

        if (userId) {
          const reponseResponse = await axios.get(`http://localhost:5000/reponses/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setResponses(reponseResponse.data || []); // Assurez-vous que c'est un tableau
        }
      } catch (error) {
        toast({
          title: 'Failed to load evaluations or quizzes.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [niveauId, getEvaluationsByNiveauId, getQuizzByNiveauId, userId, token, toast]);

  const hasUserResponded = (evaluationId) => {
    return responses.some(response => response.evaluationId === evaluationId);
  };

  const handleToggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  const onAdd = (evaluationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'No token found.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    axios.post(`http://localhost:5000/reponses/${evaluationId}`, { text: newReponse }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const newReponseData = res.data;
      setEvaluations(prevEvaluations => 
        prevEvaluations.map(evaluation =>
          evaluation._id === evaluationId
            ? { ...evaluation, reponses: [...evaluation.reponses, newReponseData._id] }
            : evaluation
        )
      );
      setNewReponse('');
      toast({
        title: 'Response added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 401) {
          setErrors("Unauthorized. Please check your token.");
        } else {
          setErrors("An error occurred. Please try again later.");
        }
      } else {
        setErrors("An error occurred. Please try again later.");
      }
    });
  };

  if (loading) {
    return <Spinner size="xl" />;
  }


  const handleQuizResponseChange = (quizId, value) => {
    setSelectedQuizResponses((prev) => ({
      ...prev,
      [quizId]: value,
    }));
  };


  const onSubmitQuizResponse = (quizId) => {
    const token = localStorage.getItem('token');
    const selectedOption = selectedQuizResponses[quizId];
  
    if (!selectedOption) {
      toast({
        title: 'Please select an option.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    axios.post(`http://localhost:5000/quizz/reponse/${quizId}`, { selectedOption }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      toast({
        title: 'Response submitted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    //   setValidationResults((prev) => ({
    //   ...prev,
    //   [quizId]: res.data.isCorrect,
    // }));
    })
    .catch((err) => { 
      console.log(err.response);
      toast({
        title: 'Failed to submit response.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };
  
  
  
  const handleOptionChange = (quizId, selectedOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [quizId]: selectedOption,
    }));
  };

  
  const validateAnswer = (quizId,userId) => {
    const selectedOption = selectedOptions[quizId];  // Utilisation de selectedOptions

    if (selectedOption) {
        axios.post(`http://localhost:5000/quizz/reponse/${quizId}/${userId}`, {
            selectedOption: selectedOption,
        }, 
        // {
        //     // headers: {
        //     //     Authorization: `Bearer ${token}`,
        //     // },
        //     userId:userId, 
        // }
      )
        .then(response => {
            console.log(response.data);
            // Ici, vous pouvez mettre à jour le résultat de la validation
            const isCorrect = response.data.isCorrect; // Suppose que le backend renvoie cette information
            setValidationResults((prev) => ({
                ...prev,
                [quizId]: isCorrect,
            }));

              setValidationResults((prev) => ({
      ...prev,
      [quizId]: response.data.isCorrect,
    }));
        })
        .catch(error => {
            console.error('There was an error!', error.response || error.message);
        });
    } else {
        console.log('No option selected');
        toast({
            title: 'Please select an option.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};




  return (
    <Box>
    <Stack spacing={8}>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Évaluations</Text>
        {evaluations.length > 0 ? (
          evaluations.map((evaluation) => {
            const userHasResponded = hasUserResponded(evaluation._id);
            return (
              <Box key={evaluation._id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold">{evaluation.titre}</Text>
                </Flex>
                <Button mt={2} colorScheme="yellow" onClick={() => handleToggleDetails(evaluation._id)}>
                  {showDetails[evaluation._id] ? 'Réduire' : 'Voir plus'}
                </Button>
                <Collapse in={showDetails[evaluation._id]}>
                  <VStack align="start" spacing={2} mt={4}>
                    <Text>Description: {evaluation.description}</Text>
                    <Text>Question: {evaluation.question}</Text>
                    <Box mt={4}>
                      <Text fontWeight="bold">Votre Réponse:</Text>
                      {evaluation.reponses.map((reponseId) => {
                        const reponse = responses.find(r => r._id === reponseId);
                        return reponse ? <Text key={reponse._id}>{reponse.text}</Text> : <Text></Text>;
                      })}
                    </Box>
                    <Input
                      mt={2}
                      placeholder="Votre réponse"
                      value={newReponse}
                      onChange={(e) => setNewReponse(e.target.value)}
                      isDisabled={userHasResponded}
                    />
                    <Button
                      mt={2}
                      colorScheme="blue"
                      onClick={() => onAdd(evaluation._id)}
                      isDisabled={userHasResponded}
                    >
                      Ajouter une réponse
                    </Button>
                  </VStack>
                </Collapse>
              </Box>
            );
          })
        ) : (
          <Text>Aucune évaluation ajoutée pour l'instant</Text>
        )}
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Quiz</Text>
        {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Box key={quiz._id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                <VStack align="start" spacing={2} mt={4}>
                  <Text fontWeight="bold">{quiz.titre}</Text>
                  <Text>Description: {quiz.description}</Text>
                  <Text>Question: {quiz.question}</Text>
                  <RadioGroup
                    onChange={(value) => handleOptionChange(quiz._id, value)}
                    value={selectedOptions[quiz._id] || ''}
                  >
                    <ChakraStack>
                      <Radio
                        colorScheme={
                          validationResults[quiz._id] !== undefined
                            ? selectedOptions[quiz._id] === '1'
                              ? validationResults[quiz._id] ? 'green' : 'red'
                              : 'gray'
                            : 'blue'
                        }
                        value="1"
                      >
                        1: {quiz.option1}
                      </Radio>
                      <Radio
                        colorScheme={
                          validationResults[quiz._id] !== undefined
                            ? selectedOptions[quiz._id] === '2'
                              ? validationResults[quiz._id] ? 'green' : 'red'
                              : 'gray'
                            : 'blue'
                        }
                        value="2"
                      >
                        2: {quiz.option2}
                      </Radio>
                      <Radio
                        colorScheme={
                          validationResults[quiz._id] !== undefined
                            ? selectedOptions[quiz._id] === '3'
                              ? validationResults[quiz._id] ? 'green' : 'red'
                              : 'gray'
                            : 'blue'
                        }
                        value="3"
                      >
                        3: {quiz.option3}
                      </Radio>
                      <Radio
                        colorScheme={
                          validationResults[quiz._id] !== undefined
                            ? selectedOptions[quiz._id] === '4'
                              ? validationResults[quiz._id] ? 'green' : 'red'
                              : 'gray'
                            : 'blue'
                        }
                        value="4"
                      >
                        4: {quiz.option4}
                      </Radio>
                    </ChakraStack>
                  </RadioGroup>
                  <Box mt={4}>
                      <Text fontWeight="bold">Votre Réponse:</Text>
                      {quiz.reponses.map((reponseId) => {
                        const reponse = responses.find(r => r._id === reponseId);
                        return reponse ? <Text key={reponse._id}>{reponse.text}</Text> : <Text></Text>;
                      })}
                    </Box>
                  <Button
                    mt={2}
                    colorScheme="blue"
                    onClick={() => validateAnswer(quiz._id, userId)}
                    isDisabled={validationResults[quiz._id] !== undefined}
                  >
                    Valider
                  </Button>
                  {validationResults[quiz._id] !== undefined && (
                    <Text color={validationResults[quiz._id] ? 'green.500' : 'red.500'}>
                      {validationResults[quiz._id] ? 'Réponse correcte' : 'Réponse fausse'}
                    </Text>
                  )}
                </VStack>
              </Box>
            ))
          ) : (
            <Text>Aucun quiz ajouté pour l'instant</Text>
          )}

      </Box>
    </Stack>
  </Box>
  );
};

export default Passevaluation;
