import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Text, useDisclosure, useRadio, VStack } from "@chakra-ui/react";
import NavbarComponent from "../../components/NavbarFront";
import background from '../../images/background.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Registration.css"
const Registration = () => {


    const [typeEffect] = useTypewriter({
        words: ['Bienvenue sur SA Coaching , votre plateforme dédiée à l\'apprentissage et au développement professionnel. Explorez nos cours variées et commencez votre parcours éducatif dès aujourd\'hui.'],
        typeSpeed: 10,
        delaySpeed: 5000
      });
    
      const splitText = (text) => {
        const parts = text.split(' ');
        return (
          <>
            <span>{parts[0]}</span>{' '}
            <span>{parts[1]}</span>{' '}
            <span style={{fontWeight: 'bold' }}>{parts[2]}</span>{' '}
            <span style={{fontWeight: 'bold' }}>{parts[3]}</span>{' '}
            <span>{parts[4]}</span>{' '}
            <span>{parts[5]}</span>{' '}
            <span>{parts.slice(6).join(' ')}</span>
          </>
        );
      };


    const imageStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
      };


    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        cpassword: '',
        numtel: '',
        cin: '',
        secteur: '',
        nomEntreprise: '',
        poste: ''
    });

    const resetForm = () => {
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          cpassword: '',
          numtel: '',
          cin: '',
          secteur: '',
          nomEntreprise: '',
          poste: ''
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
            validationErrors.nom = "nom obligatoire";
        }

        if (!formData.prenom) {
            isvalid = false;
            validationErrors.prenom = "prénom obligatoire";
        }

        if (!formData.email) {
            isvalid = false;
            validationErrors.email = "Email obligatoire";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = "Email non valide";
        }

        if (!formData.password) {
            isvalid = false;
            validationErrors.password = "mot de passe obligatoire";
        } else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = "le mot de passe doit contenir au moins 6 caractères";
        }

        if (formData.cpassword !== formData.password) {
            isvalid = false;
            validationErrors.cpassword = "confirmation du mot de passe ne correspond pas";
        }
        if (!formData.numtel) {
            isvalid = false;
            validationErrors.numtel = "numéro de téléphone obligatoire";
        }
        if (!formData.secteur) {
            isvalid = false;
            validationErrors.secteur = "secteur obligatoire";
        }
        if (!formData.nomEntreprise) {
            isvalid = false;
            validationErrors.nomEntreprise = "nom d'entreprise obligatoire";
        }
        if (!formData.poste) {
            isvalid = false;
            validationErrors.poste = "poste obligatoire";
        }

        if (!isSwitchChecked) {
            isvalid = false;
            validationErrors.terms = "vous devez accepter les conditions d'utilisation";
        }

        setErrors(validationErrors);
        setValid(isvalid);

        if (isvalid) {
            try {
                const response = await fetch('http://localhost:5000/auth/signup', {
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
                    alert('You signed up to our application. Now you can sign in.'); // Affiche une alerte lorsque la connexion est réussie
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error during signup request:', error);
            }
        }
    };
    const contactContainerStyle = {
        position: 'absolute',
        bottom: '70px',
        left: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
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
            <img src={background} alt="background" style={imageStyle} />          
            <NavbarComponent/>
        <Box display="flex">
            <Box flex="1" padding="50px" textAlign="left" color="white" zIndex={1} position="relative">
                    <h4 style={{
                        marginTop:'30px',
                        fontWeight: '200',
                        fontSize: '30px',
                        margin: '15px 0'
                    }}>INSCRIVEZ-VOUS</h4>

                    <Text color='#FFC300' style={{
                        fontSize: '50px',
                        margin: '10px 0', 
                        marginTop:'30px'
                    }}>
                        Découvrez Nos
                    </Text>
                    <p style={{
                        fontSize: '50px',
                        margin: '10px 0', 
                        marginTop:'-25px'
                    }}>
                        Formations
                    </p>
                    <span style={{
                        fontSize: '25px',
                        margin: '10px 0', 
                        fontWeight: '200',
                    }}>
                        {splitText(typeEffect)}
                        </span>
                    
                    
                    <div class="contact-info" style={contactContainerStyle}>
                    
                        <FontAwesomeIcon icon={faEnvelope} class="icon" color="#FFC300" />
                        <p>
                            <Box bg={'#FFC300'} borderRadius={50} width={300} px={5}>
                                info.international@sacoaching.ca
                            </Box>
                        </p>
                        
                    </div>
                    
                    
                </Box>
            <Box flex="1" display="flex" justifyContent="flex-end" padding="55px" paddingTop={8} mt={-10}>
                <Box width="650px" backgroundColor="white" p={4} borderRadius="md" boxShadow="md">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* First name */}
                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.nom}>
                                    <FormLabel color='white'>Nom <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="text"
                                        name="nom"
                                        placeholder="nom"
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
                                    <FormLabel color='white'>Prénom <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="text"
                                        name="prenom"
                                        placeholder="prénom"
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
                                    <FormLabel color='white'>Email <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                    />
                                    <Box height="20px" position="relative">
                                        <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.email}</FormErrorMessage>
                                    </Box>
                                </FormControl>
                            </div>
                            
                            {/* Number */}
                            <div className="mb-3 col-md-6">
                            <FormControl id="numtel" isInvalid={errors.numtel}>
                                    <FormLabel  color='white'>Numéro de Téléphone <span>*</span></FormLabel>
                                    <PhoneInput
                                        country={'tn'}
                                        // defaultCountry="tn"
                                        value={formData.numtel}
                                        onChange={(phone) => setFormData({ ...formData, numtel: phone })}
                                        inputStyle={{ width: '100%'}}                                       
                                    />
                                    <FormErrorMessage>{errors.numtel}</FormErrorMessage>
                                </FormControl>
                            </div>
                            

                            {/* Password */}
                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel color='white'>Mot de Passe <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="password"
                                        name="password"
                                        placeholder="mot de passe"
                                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                    />
                                    <Box height="20px" position="relative">
                                        <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.password}</FormErrorMessage>
                                    </Box>
                                </FormControl>
                            </div>
                            
                            {/* Confirm Password */}
                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.cpassword}>
                                    <FormLabel color='white'>Confirmation du Mot de Passe <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="password"
                                        name="cpassword"
                                        placeholder="Confirmez le mot de passe"
                                        onChange={(event) => setFormData({ ...formData, cpassword: event.target.value })}
                                    />
                                    <Box height="20px" position="relative">
                                        <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.cpassword}</FormErrorMessage>
                                    </Box>
                                </FormControl>
                            </div>
                            
                            {/* Nom Entreprise */}
                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.nomEntreprise}>
                                    <FormLabel color='white'>Nom d'Entreprise <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="text"
                                        name="nomEntreprise"
                                        placeholder="nom d'entreprise"
                                        onChange={(event) => setFormData({ ...formData, nomEntreprise: event.target.value })}
                                    />
                                    <Box height="20px" position="relative">
                                        <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.nomEntreprise}</FormErrorMessage>
                                    </Box>
                                </FormControl>
                            </div>
                            
                            {/* Secteur */}
                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.secteur}>
                                    <FormLabel color='white'>Secteur <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="text"
                                        name="secteur"
                                        placeholder="secteur"
                                        onChange={(event) => setFormData({ ...formData, secteur: event.target.value })}
                                    />
                                    <Box height="20px" position="relative">
                                        <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.secteur}</FormErrorMessage>
                                    </Box>
                                </FormControl>
                            </div>
                        
                            
                            {/* Poste */}
                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.poste}>
                                    <FormLabel color='white'>Poste <span>*</span></FormLabel>
                                    <Input
                                    bg="white"
                                        type="text"
                                        name="poste"
                                        placeholder="poste"
                                        onChange={(event) => setFormData({ ...formData, poste: event.target.value })}
                                    />
                                    <Box height="20px" position="relative">
                                        <FormErrorMessage position="absolute" bottom="0" fontSize="xs">{errors.poste}</FormErrorMessage>
                                    </Box>
                                </FormControl>
                            </div>

                            <div className="mb-3 col-md-6">
                                <FormControl isInvalid={!!errors.cin}>
                                    <FormLabel color='white'>Numéro CIN </FormLabel>
                                    <Input
                                    bg="white"
                                        type="text"
                                        name="cin"
                                        placeholder="numéro cin"
                                        onChange={(event) => setFormData({ ...formData, cin: event.target.value })}
                                    />
                                    
                                </FormControl>
                            </div>

                            <div className="mb-3 col-md-12">
                                        <FormControl isInvalid={!!errors.terms}>
                                            <HStack justify="center" align="center">
                                                
                                                <p style={{ marginLeft: '10px',color: 'white' }}>
                                                    J'ai lu <button type="button" onClick={onOpen} style={{ color: 'yellow', fontWeight:'bold' }} > les conditions d'utilisations</button>
                                                    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
                                                <ModalOverlay/>
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
                                                        <Button colorScheme='blue'
                                                            onClick={onClose}>
                                                            Close
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal> et je les accepte
                                                </p>
                                                <Switch id='email-alerts' isChecked={isSwitchChecked} colorScheme='yellow'style={{marginTop:'-12px' }} onChange={() => setIsSwitchChecked(!isSwitchChecked)} />
                                            </HStack>
                                            <VStack align="center">
                                            <Box height="20px" style={{marginTop:'-12px'}}>
                                                <FormErrorMessage ><Text fontSize="xs">{errors.terms}</Text></FormErrorMessage>
                                                </Box>
                                            </VStack>
                                            </FormControl>
                                    </div>
                            <Button  type="submit" bg={'#FFC300'}>S'inscrire</Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </Box>
        </div>

    );
};

export default Registration;
