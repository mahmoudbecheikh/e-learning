import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Textarea,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { GlobalContext } from '../../globalwrapper';

const EvaluationForm = ({ isEdit, evaluation, niveauId, isOpen, onClose }) => {
  const { updateEvaluation, addEvaluationToNiveau } = useContext(GlobalContext);
  const toast = useToast();

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    question: '',
    type: '',
    niveauId: niveauId || '',
    score: 0,
    isValidated: false,
  });

  useEffect(() => {
    if (isEdit && evaluation) {
      setFormData(evaluation);
    }
  }, [isEdit, evaluation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateEvaluation(evaluation._id, formData);
      } else {
        await addEvaluationToNiveau(niveauId, formData);
      }
      toast({
        title: `Evaluation ${isEdit ? 'updated' : 'created'} successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: `Failed to ${isEdit ? 'update' : 'create'} evaluation.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? 'Edit Evaluation' : 'Add Evaluation'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            maxW="full"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="6"
            m="6"
            boxShadow="md"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing="4">
                <FormControl id="titre" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Title"
                  />
                </FormControl>

                <FormControl id="description" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                  />
                </FormControl>

                <FormControl id="question" isRequired>
                  <FormLabel>Question</FormLabel>
                  <Textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Question"
                  />
                </FormControl>

                <FormControl id="type" isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select name="type" value={formData.type} onChange={handleChange}>
                    <option value="paragraph">Paragraph</option>
                    <option value="shortresponse">Short Response</option>
                  </Select>
                </FormControl>

                <FormControl id="score">
                  <FormLabel>Score</FormLabel>
                  <Input
                    type="number"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    placeholder="Score"
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="isValidated" mb="0">
                    Validated:
                  </FormLabel>
                  <Switch
                    id="isValidated"
                    name="isValidated"
                    isChecked={formData.isValidated}
                    onChange={() => setFormData({ ...formData, isValidated: !formData.isValidated })}
                  />
                </FormControl>

                <Button type="submit" colorScheme="teal" size="md">
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </VStack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EvaluationForm;
