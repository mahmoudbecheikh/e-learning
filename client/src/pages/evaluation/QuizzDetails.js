// src/components/QuizzDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { GlobalContext } from '../globalwrapper';

const QuizzDetails = () => {
    const { getQuizzById } = useContext(GlobalContext);

  const [quizz, setQuizz] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuizz = async () => {
      const data = await getQuizzById(id);
      setQuizz(data);
    };
    fetchQuizz();
  }, [id]);

  if (!quizz) return <div>Loading...</div>;

  return (
    <Box p={4}>
      <Heading mb={4}>{quizz.titre}</Heading>
      <VStack spacing={4} align="start">
        <Text>Description: {quizz.description}</Text>
        <Text>Question: {quizz.question}</Text>
        <Text>Option 1: {quizz.option1}</Text>
        <Text>Option 2: {quizz.option2}</Text>
        <Text>Option 3: {quizz.option3}</Text>
        <Text>Option 4: {quizz.option4}</Text>
        <Text>Correct Option: {quizz.correctOption}</Text>
        <Button as={Link} to={`/quizz/edit/${quizz._id}`} colorScheme="teal">
          Edit
        </Button>
      </VStack>
    </Box>
  );
};

export default QuizzDetails;
