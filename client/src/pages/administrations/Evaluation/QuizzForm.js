import React, { useState, useEffect, useContext } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Select,
    useToast,
} from '@chakra-ui/react';
import { GlobalContext } from '../../globalwrapper';

const QuizForm = ({ isEdit, quiz, niveauId, isOpen, onClose }) => {
    const { addQuizzToNiveau, handleUpdateQuizz } = useContext(GlobalContext);
    const toast = useToast();

    const [form, setForm] = useState({
        titre: '',
        description: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '',
    });

    useEffect(() => {
        if (isEdit && quiz) {
            setForm(quiz);
        }
    }, [isEdit, quiz]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await handleUpdateQuizz(quiz._id, form);
            } else {
                await addQuizzToNiveau(niveauId, form);
            }
            toast({
                title: `Quiz ${isEdit ? 'updated' : 'created'} successfully.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose(); // Close the modal
        } catch (error) {
            toast({
                title: `Failed to ${isEdit ? 'update' : 'create'} quiz.`,
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
                <ModalHeader>{isEdit ? 'Edit Quiz' : 'Create a New Quiz'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input name="titre" value={form.titre} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input name="description" value={form.description} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Question</FormLabel>
                            <Input name="question" value={form.question} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Option 1</FormLabel>
                            <Input name="option1" value={form.option1} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Option 2</FormLabel>
                            <Input name="option2" value={form.option2} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Option 3</FormLabel>
                            <Input name="option3" value={form.option3} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Option 4</FormLabel>
                            <Input name="option4" value={form.option4} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Correct Option</FormLabel>
                            <Select name="correctOption" value={form.correctOption} onChange={handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Select>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default QuizForm;
