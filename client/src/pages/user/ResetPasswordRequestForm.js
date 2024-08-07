import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import background from '../../images/background.jpg';
import logo from '../../images/logo.png';

const ResetPasswordRequestForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/reset-password-request', { email });
      setMessage('Un email de réinitialisation a été envoyé à votre adresse email.');
    } catch (error) {
      setMessage('Une erreur s\'est produite. Veuillez réessayer.');
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
</div>
               </Box>      

                <Box flex="1" display="flex" justifyContent="flex-end" paddingTop="200px" mt={-10}>
      <Box width="600px" mr={70} p={6} zIndex={1} position="relative">
      <p style={{display:'flex',
                        fontSize: '20px',
                        margin: '10px 0', 
                        fontWeight: '500',
                        color:'white',
                        marginBottom:'30px'

                    }}>
                        Entrez votre adresse email pour réinitialiser votre mot de passe
                    </p>
    <Box>
      <VStack as="form" onSubmit={handleSubmit}>
        
        <Input
          type="email"
          bg="white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          mb={10}
        />
        <Button type="submit" colorScheme="yellow" color={"white"} width={"full"} mb={10} >Réinitialiser le mot de passe</Button>
      </VStack>
      {message && <Text fontWeight={500} color={"white"} >{message}</Text>}
    </Box>
    </Box>
              </Box>
          </Box>    
    </div>  );
};

export default ResetPasswordRequestForm;
