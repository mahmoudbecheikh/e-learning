import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel, Form, FormControl } from 'react-bootstrap';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getFormation = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formation');
        setFormations(response.data);
      } catch (error) {
        console.error('Erreur de recuperation des formations', error);
      }
    };

    getFormation();
  }, []);

  const filteredFormations = formations.filter(formation =>
    formation.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Formations</h2>
      <Form >
        <FormControl
          type="text"
          placeholder="recherche formation"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Carousel>
        {filteredFormations.map((formation) => (
          <Carousel.Item key={formation._id}>
             <Link to={`/formationdetails/${formation._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div  style={{ height: '300px', background: '#eee' }}>
              <h3>{formation.titre}</h3>
              <p>{formation.description}</p>
             
            </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Formations;
