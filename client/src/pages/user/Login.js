import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; 
import background from '../../images/background.jpg';
import logo from '../../images/logo.png';
import logoblanc from '../../images/logoblanc.png';

import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({}); // État pour stocker les données de connexion des utilisateurs

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    if (!formData.email) {
      isvalid = false;
      validationErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Format d'email incorrect";
    }

    if (!formData.password) {
      isvalid = false;
      validationErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password =
        "Le mot de passe doit comporter au moins 6 caractères";
    }

    if (!isvalid) {
      setErrors(validationErrors);
      setValid(isvalid);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Utilisez formData au lieu de e
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error during login:",
          errorData.message || "Failed to sign in. Please try again later."
        );
        alert("mot de passe incorrect! Réessayez"); // Affiche une alerte lorsque la connexion est réussie
      } else {
        const responseData = await response.json();
        console.log("Login successful! Received token:", responseData.token);
        localStorage.setItem("token", responseData.token);
        try {
            const decodedToken = jwtDecode(responseData.token);
            localStorage.setItem("email", decodedToken.email);
            localStorage.setItem("id", decodedToken.sub);
          } catch (error) {
            console.error('Invalid token:', error);
          }
        alert("Connexion réussie !"); // Affiche une alerte lorsque la connexion est réussie
        navigate("/");
      }
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  const imageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
  };
  return (
<div>  
            <img src={background} alt="background" style={imageStyle} />          
        <Box display="flex">
        <Box flex="1" padding="50px" textAlign="left" color="white" zIndex={1} position="relative">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginTop: '-100px'
        }}>
        <img src={logo} alt="logo" />
        {/* <img src={logoblanc} alt="logoblanc" />           */}

      </div>
        <p style={{bottom:'20px', position:'absolute',left:'150px'}}>vous n'avez pas de compte ? <Link to="/registration"><button style={{color:'#83d3e1',bottom:'10px'}}>s'inscrire</button></Link></p>        
               </Box>      

                <Box flex="1" display="flex" justifyContent="flex-end" padding="40px" mt={-10}>
      <Box width="600px" mr={70} p={6} zIndex={1} position="relative">
      <p style={{display:'flex',
                        fontSize: '20px',
                        margin: '10px 0', 
                        fontWeight: '400',
                        color:'white',
                        marginTop:'80px'

                    }}>
                        Sur SA Coaching, accédez à des formations de qualité et développez vos compétences professionelles
                    </p>
              <form onSubmit={handleSubmit} style={{
                        marginTop:'60px'

                    }}>
                <div className="row">
                  {/* Email */}
                  <div className="mb-3 col-md-12">
                    {/* <FormControl isInvalid={!!errors.email}>
                      <FormLabel color='white'>
                        Email <span className="text-danger">*</span>
                      </FormLabel>
                      <Input
                      borderRadius={15}
                      style={{  backgroundColor: 'rgba(255, 255, 255, 0.7) '}}
                      bg="white"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Entrez l'email"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            email: event.target.value,
                          })
                        }
                      />
                      <Box height="20px" position="relative">
                        <FormErrorMessage
                          position="absolute"
                          bottom="0"
                          fontSize="xs"
                        >
                          {errors.email}
                        </FormErrorMessage>
                      </Box>
                    </FormControl> */}

<FormControl isInvalid={!!errors.email}>
  <FormLabel color='white'>
    Email <span className="text-danger">*</span>
  </FormLabel>
  <Input
    borderRadius={15}
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
    bg="white"
    type="email"
    name="email"
    className="form-control"
    placeholder="Entrez l'email"
    focusBorderColor="blue.500"    // Couleur de la bordure lorsqu'il est focus
    errorBorderColor="#83d3e1"  // Couleur de la bordure en cas d'erreur
    onChange={(event) =>
      setFormData({
        ...formData,
        email: event.target.value,
      })
    }
  />
  <Box height="20px" position="relative">
    <FormErrorMessage
      position="absolute"
      bottom="0"
      fontSize="xs"
      color="#83d3e1"   // Couleur personnalisée pour le texte d'erreur
    >
      {errors.email}
    </FormErrorMessage>
  </Box>
</FormControl>

                  </div>

                  {/* Password */}
                  <div className="mb-3 col-md-12">
                    <FormControl isInvalid={!!errors.password}>
                      <FormLabel color='white'>
                        Mot de passe <span className="text-danger">*</span>
                      </FormLabel>
                      <Input
                      borderRadius={15}
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.7) '}}
                        bg="white"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Entrez le mot de passe"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            password: event.target.value,
                          })
                        }
                      />
                      <Box height="20px" position="relative">
                        <FormErrorMessage
                          position="absolute"
                          bottom="0"
                          fontSize="xs"
                        >
                          {errors.password}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                    
                  </div>
                  <div className="col-md-12 text-center">
                      
                      <Button type="submit"  bg={"#83d3e1"} width={"50%"} borderRadius={15}  >
                      Connexion
                    </Button>
                  </div>
                  <Link
                      to="/reset-password-request"
                      style={{ marginLeft: "6px", marginTop:'20px' }}
                    >
                      <button style={{ color: "white" }}>
                        mot de passe oublié ?
                      </button>
                    </Link>
                  {/* <Box position='relative' padding='10'>
  <Flex alignItems="center" ml={3}>
    <Divider width="170px" ml={-6} />
    <Text color="white" px="5">
      Ou continuez avec
    </Text>
    <Divider width="170px" mr={-1}/>
  </Flex>
</Box>
                    <div className="col-md-12 text-center">
                    <Button type="submit" colorScheme="yellow" color={"white"} width={"full"}>
                     Numéro de téléphone
                    </Button>
                  </div> */}
                </div>
              </form>
              </Box>
              </Box>
          </Box>    
    </div>
  );
};

export default Login;
