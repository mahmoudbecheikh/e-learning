import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../../images/background.jpg';
import logo from '../../images/logo.png';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { password });
      setMessage('Votre mot de passe a été réinitialisé avec succès.');
      navigate('/login');
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
                        Entrez votre nouveau mot de passe
                    </p>
    <Box>
      <VStack as="form" onSubmit={handleSubmit}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          required
          mb={10}
          bg="white"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmer le nouveau mot de passe"
          required
          mb={10}
          bg="white"
        />
        <Button type="submit" mb={10} colorScheme="yellow" color={"white"} >Réinitialiser le mot de passe</Button>
      </VStack>
      {message && <Text fontWeight={500} color={"white"} >{message}</Text>}
    </Box>
    </Box>
              </Box>
          </Box>    
    </div>  );
};

export default ResetPasswordForm;
