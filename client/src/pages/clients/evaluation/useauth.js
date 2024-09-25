import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Assurez-vous d'avoir installé cette bibliothèque

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        setUser(null);
      }
    }
  }, []);

  return { user };
};

export default useAuth;
