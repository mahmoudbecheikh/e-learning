import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Text,
    useDisclosure,
    Collapse,
    VStack,
    useToast,
    Spinner,
    Heading,
    Flex,
    Tooltip,
} from '@chakra-ui/react';
import { GlobalContext } from '../../globalwrapper';
import QuizForm from './QuizzForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const QuizList = ({ niveauId,fetchQuizzes }) => {
    const { handleDeleteQuizz, getQuizzByNiveauId } = useContext(GlobalContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showDetails, setShowDetails] = useState({});
    const [quizzes, setQuizzes] = useState([]);
    const toast = useToast();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuizzByNiveauId(niveauId)
            .then((response) => {
                setQuizzes(response.data);
            })
            .catch((error) => {
                toast({
                    title: 'Failed to load quizzes.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [niveauId,fetchQuizzes, getQuizzByNiveauId, toast]);

    const handleToggleDetails = (quizId) => {
        setShowDetails((prev) => ({
            ...prev,
            [quizId]: !prev[quizId],
        }));
    };

    const handleEditQuiz = (quiz) => {
        setSelectedQuiz(quiz); // Set the selected quiz for editing
        onOpen(); // Open the modal
    };

    const handleModalClose = () => {
        onClose(); // Close the modal
        // Refresh the quizzes list
        getQuizzByNiveauId(niveauId)
            .then((response) => {
                setQuizzes(response.data);
            })
            .catch((error) => {
                toast({
                    title: 'Failed to load quizzes.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box>
            {/* <Heading size="md">Quizz</Heading> */}
            {/* <Button onClick={handleAddQuiz} colorScheme="teal" mb={4}>
                Add Quiz
            </Button> */}
            <Stack spacing={4}>
                {quizzes.map((quiz) => (
                    <Box key={quiz._id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
<Flex justify="space-between" align="center">
                            <Text fontSize="xl" fontWeight="bold">{quiz.titre}</Text>
                            <Flex>
                            <Tooltip label='modifier la question' bg={'green'}>
                                <button
                                    size="sm"
                                    onClick={() => handleEditQuiz(quiz)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '7px', width: '15px', color: 'green' }} />
                                </button>
                                </Tooltip>
                                <Tooltip label='supprimer la question' bg={'red'}>
                                <button
                                    size="sm"
                                    onClick={() => handleDeleteQuizz(quiz._id)}
                                    ml={2}
                                >
                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '7px', width: '15px', color: 'red' }} />
                                </button>
                                </Tooltip>

                            </Flex>
                        </Flex> 
                        <Text mt={2}>{quiz.question}</Text>
                        <Box>
                            <Button
                                mt={2}
                                colorScheme="yellow"
                                onClick={() => handleToggleDetails(quiz._id)}
                            >
                                {showDetails[quiz._id] ? 'Réduire' : 'Voir plus'}
                            </Button>
                            <Collapse in={showDetails[quiz._id]}>
                                <VStack align="start" spacing={2} mt={4}>
                                    <Text>Description: {quiz.description}</Text>
                                    <Text>Option 1: {quiz.option1}</Text>
                                    <Text>Option 2: {quiz.option2}</Text>
                                    <Text>Option 3: {quiz.option3}</Text>
                                    <Text>Option 4: {quiz.option4}</Text>
                                    <Text>Correct Option: {quiz.correctOption}</Text>
                                </VStack>
                            </Collapse>
                        </Box>
                        {/* <Box>
                            <button
                                mt={2}
                                colorScheme="yellow"
                                onClick={() => handleEditQuiz(quiz)}
                            >
                                
                                <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '7px', width: '15px',color:'green' }} />

                            </button>
                            <button
                                mt={2}
                                colorScheme="red"
                                onClick={() => handleDeleteQuizz(quiz._id)}
                            >
                                <FontAwesomeIcon icon={faTrash} style={{ marginRight: '7px', width: '15px', color:'red' }} />

                            </button>
                        </Box> */}
                    </Box>
                ))}
            </Stack>
            {isOpen && (
                <QuizForm
                    isEdit={!!selectedQuiz}
                    quiz={selectedQuiz} // Pass the selected quiz
                    niveauId={niveauId}
                    isOpen={isOpen}
                    onClose={handleModalClose} // Pass the onClose handler
                />
            )}
        </Box>
    );
};

export default QuizList;
