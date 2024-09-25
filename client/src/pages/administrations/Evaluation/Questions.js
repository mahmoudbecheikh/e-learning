import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Spinner,
  Stack,
  Button,
  Fade,
  Flex,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import QuizList from "./QuizzList";
import EvaluationsList from "./EvaluationsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import QuizForm from "./QuizzForm";
import { GlobalContext } from "../../globalwrapper";
import EvaluationForm from "./EvaluationForm";

const Questions = ({ niveauId }) => {
  const { getQuizzByNiveauId, getEvaluationsByNiveauId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const toast = useToast();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  const {
    isOpen: isQuizFormOpen,
    onToggle: onQuizFormToggle,
    onOpen: onQuizFormOpen,
    onClose: onQuizFormClose,
  } = useDisclosure();
  const {
    isOpen: isEvaluationFormOpen,
    onToggle: onEvaluationFormToggle,
    onOpen: onEvaluationFormOpen,
    onClose: onEvaluationFormClose,
  } = useDisclosure();

  const { isOpen: isAddQuestionOpen, onToggle: onAddQuestionToggle } = useDisclosure();

  useEffect(() => {
    setLoading(false);
  }, [niveauId]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  const handleAddQuiz = () => {
    setSelectedQuiz(null); // Reset the selected quiz
    onQuizFormOpen(); // Open the quiz modal
  };

  const handleAddEvaluation = () => {
    setSelectedEvaluation(null); // Reset the selected evaluation
    onEvaluationFormOpen(); // Open the evaluation modal
  };

  const fetchQuizzes = () => {
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
  };

  const handleQuizModalClose = () => {
    onQuizFormClose(); // Close the quiz modal
    fetchQuizzes(); // Refresh the quizzes list
  };

  const fetchEvaluations = () => {
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
  };

  const handleEvaluationModalClose = () => {
    onEvaluationFormClose(); // Close the evaluation modal
    fetchEvaluations(); // Refresh the evaluations list
  };

  return (
    <Container maxW="container.lg">
      <Button onClick={onAddQuestionToggle}>
        Ajouter une Question
        <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '7px', width: '12px' }} />
      </Button>
      <Fade in={isAddQuestionOpen}>
        <Stack spacing={3} direction='row' ml={10} mt={3}>
          <button onClick={handleAddQuiz}>
            <Flex align="center">
              <FontAwesomeIcon icon={faCirclePlus} style={{ marginRight: '7px', width: '15px' }} />
              <Text mb={0}>Quizz</Text>
            </Flex>
          </button>
          <button onClick={handleAddEvaluation}>
            <Flex align="center">
              <FontAwesomeIcon icon={faCirclePlus} style={{ marginRight: '7px', width: '15px' }} />
              <Text mb={0}>Question</Text>
            </Flex>
          </button>
        </Stack>
      </Fade>

      <Box mt="4">
        <QuizList niveauId={niveauId} fetchQuizzes={fetchQuizzes} />
        <EvaluationsList niveauId={niveauId} fetchEvaluations={fetchEvaluations} />
      </Box>

      {isQuizFormOpen && (
        <QuizForm
          niveauId={niveauId}
          isOpen={isQuizFormOpen}
          onClose={handleQuizModalClose} // Pass the onClose handler
        />
      )}

      {isEvaluationFormOpen && (
        <EvaluationForm
          niveauId={niveauId}
          isOpen={isEvaluationFormOpen}
          onClose={handleEvaluationModalClose} // Pass the onClose handler
        />
      )}
    </Container>
  );
};

export default Questions;
