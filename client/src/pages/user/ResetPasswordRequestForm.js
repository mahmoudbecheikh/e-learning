import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

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
  

  return (
    <div className="container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh' // Assurez-vous que l'élément prend toute la hauteur de la vue
  }}>
    <Box>
      <VStack as="form" onSubmit={handleSubmit}>
        <Text style={{
                      fontSize: '20px',
                      margin: '10px 0', 
                    }} 
        > Entrez votre adresse email pour réinitialiser votre mot de passe</Text>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Button type="submit">Réinitialiser le mot de passe</Button>
      </VStack>
      {message && <Text>{message}</Text>}
    </Box>
    </div>
  );
};

export default ResetPasswordRequestForm;
