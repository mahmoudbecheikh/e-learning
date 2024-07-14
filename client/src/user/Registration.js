import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Text, useDisclosure, useRadio, VStack } from "@chakra-ui/react";

const Registration = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        cpassword: '',
        numtel: '',
        cin: ''
    });

    const resetForm = () => {
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          cpassword: '',
          numtel: '',
          cin: ''
        });
      };
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();
    const [isSwitchChecked, setIsSwitchChecked] = useState(false); // État pour suivre si le Switch est activé
    const [successMessage, setSuccessMessage] = useState('');
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  
   const { isOpen, onOpen, onClose } = useDisclosure();

   const handleSubmit = async (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    if (!formData.nom) {
        isvalid = false;
        validationErrors.nom = "Name required";
    }

    if (!formData.prenom) {
        isvalid = false;
        validationErrors.prenom = "Last name required";
    }

    if (!formData.email) {
        isvalid = false;
        validationErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        isvalid = false;
        validationErrors.email = "Email is not valid";
    }

    if (!formData.password) {
        isvalid = false;
        validationErrors.password = "Password required";
    } else if (formData.password.length < 6) {
        isvalid = false;
        validationErrors.password = "Password length must be at least 6 characters";
    }

    if (formData.cpassword !== formData.password) {
        isvalid = false;
        validationErrors.cpassword = "Confirm password does not match";
    }
    if (!formData.numtel) {
        isvalid = false;
        validationErrors.numtel = "numtel required";
    }
    if (!formData.cin) {
        isvalid = false;
        validationErrors.cin = "cin required";
    }



    if (!isSwitchChecked) {
        isvalid = false;
        validationErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(validationErrors);
    setValid(isvalid);

    if (isvalid) {
        try {
            const response = await fetch('http://localhost:5001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error during signup:', errorData.message);
            } else {
                const responseData = await response.json();
                console.log('Signup successful! Token received:', responseData.token);

                localStorage.setItem('token', responseData.token);
                setIsSignUpSuccess(true);
                setSuccessMessage('You signed up to our application. Now you can sign in.');
                resetForm();
            }
        } catch (error) {
            console.error('Error during signup request:', error);
        }
    }
};



    const RadioCard = (props) => {
        const { getInputProps, getRadioProps } = useRadio(props);
        const input = getInputProps();
        const checkbox = getRadioProps();

        return (
            <Box as='label'>
                <input {...input} />
                <Box
                    {...checkbox}
                    cursor='pointer'
                    borderWidth='1px'
                    borderRadius='3xl'
                    boxShadow='md'
                    _checked={{
                        bg: '#EF4346',
                        color: 'white',
                        borderColor: '#EF4346',
                    }}
                    _focus={{
                        boxShadow: 'outline',
                    }}
                    px={130}
                    py={1.5}
                >
                    {props.children}
                </Box>
            </Box>
        );
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="signup-form">
                            <div style={{ textAlign: 'center' }}>
                                {/* Centre les éléments dans le conteneur parent */}
                                <h4 style={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    margin: '10px 0', 
                                }}>Registration</h4>

                                <p style={{
                                    fontSize: '13px',
                                    margin: '10px 0', 
                                }}>
                                    Welcome To SA coaching
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* First name */}
                                    <div className="mb-3 col-md-6">
                                        <FormControl isInvalid={!!errors.nom}>
                                            <FormLabel>nom <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="text"
                                                name="nom"
                                                placeholder="Enter First Name"
                                                onChange={(event) => setFormData({ ...formData, nom: event.target.value })}
                                            />
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.nom}</FormErrorMessage>
                                            </Box>
                                        </FormControl>
                                    </div>
                                    {/* Last Name */}
                                    <div className="mb-3 col-md-6">
                                        <FormControl isInvalid={!!errors.prenom}>
                                            <FormLabel>prenom <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="text"
                                                name="prenom"
                                                placeholder="Enter Last Name"
                                                onChange={(event) => setFormData({ ...formData, prenom: event.target.value })}
                                            />
                                        
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.prenom}</FormErrorMessage>
                                            </Box>
                                        </FormControl>
                                    </div>
                                    
                                    {/* Email */}
                                    <div className="mb-3 col-md-6">
                                        <FormControl isInvalid={!!errors.email}>
                                            <FormLabel>Email <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email"
                                                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                            />
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.email}</FormErrorMessage>
                                            </Box>
                                        </FormControl>
                                    </div>
                                    
                                    {/* Password */}
                                    <div className="mb-3 col-md-6">
                                        <FormControl isInvalid={!!errors.password}>
                                            <FormLabel>Password <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Enter Password"
                                                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                            />
                                            
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.password}</FormErrorMessage>
                                            </Box>
                                        </FormControl>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <FormControl isInvalid={!!errors.cpassword}>
                                            <FormLabel>Confirm Password <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="password"
                                                name="cpassword"
                                                placeholder="Confirm Password"
                                                onChange={(event) => setFormData({ ...formData, cpassword: event.target.value })}
                                            />
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.cpassword}</FormErrorMessage>
                                            </Box>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.numtel}>
                                            <FormLabel>numtel <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="text"
                                                name="numtel"
                                                placeholder="Enter numtel"
                                                onChange={(event) => setFormData({ ...formData, numtel: event.target.value })}
                                            />
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.numtel}</FormErrorMessage>
                                            </Box>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.cin}>
                                            <FormLabel>cin <span className="text-danger">*</span></FormLabel>
                                            <Input
                                                type="text"
                                                name="cin"
                                                placeholder="Enter cin"
                                                onChange={(event) => setFormData({ ...formData, cin: event.target.value })}
                                            />
                                            <Box height="20px" position="relative">
                                                <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.cin}</FormErrorMessage>
                                            </Box>
                                        </FormControl>
                                    </div>
                                    <div className="mb-3 col-md-12">
                                        <FormControl isInvalid={!!errors.terms}>
                                            <HStack justify="center" align="center">
                                                
                                                <p style={{ marginLeft: '10px' }}>
                                                    J'ai lu <button type="button" onClick={onOpen} style={{ color: '#EF4346' }} > les conditions d'utilisations</button>
                                                    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Conditions d'utilisations</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo vel justo ullamcorper posuere. Sed accumsan iaculis fermentum.
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button style={{ backgroundColor: '#4D6466', borderRadius: '50px', color: 'white', fontWeight: '400',paddingLeft: '30px',
                                                paddingRight: '30px' }}
                                                            onClick={onClose}>
                                                            Close
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal> et je les accepte
                                                </p>
                                                <Switch id='email-alerts' isChecked={isSwitchChecked} colorScheme='red'style={{marginTop:'-12px' }} onChange={() => setIsSwitchChecked(!isSwitchChecked)} />
                                            </HStack>
                                            <VStack align="center">
                                            <Box height="20px" style={{marginTop:'-12px'}}>
                                                <FormErrorMessage ><Text fontSize="xs">{errors.terms}</Text></FormErrorMessage>
                                                </Box>
                                            </VStack>
                                            </FormControl>
                                    </div>
                                    <div className="col-md-12 text-center">
                                    
                                        <Button type="submit" colorScheme='blue'>Sign up Now
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;

