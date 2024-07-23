import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  

  return (
    <div className="container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh' // s'assurer que l'élément prend toute la hauteur de la vue
  }}>
    <Box>
      <VStack as="form" onSubmit={handleSubmit}>
        <Text>Entrez votre nouveau mot de passe</Text>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          required
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmer le nouveau mot de passe"
          required
        />
        <Button type="submit">Réinitialiser le mot de passe</Button>
      </VStack>
      {message && <Text>{message}</Text>}
    </Box>
    </div>
  );
};

export default ResetPasswordForm;
