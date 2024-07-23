import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Heading,
  Input,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getFormation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/formation");
        setFormations(response.data);
      } catch (error) {
        console.error("Erreur de recuperation des formations", error);
      }
    };

    getFormation();
  }, []);

  const filteredFormations = formations.filter((formation) =>
    formation.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Heading as="h2" size="xl" mb={4}>
        Formations
      </Heading>
      <Input
        placeholder="Recherche formation"
        mb={4}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Carousel>
        {filteredFormations.map((formation) => (
          <Box
            key={formation._id}
            as={Link}
            to={`/formationdetails/${formation._id}`}
            textDecoration="none"
            color="inherit"
            p={4}
          >
            <VStack spacing={4} align="stretch">
              {formation.image ? (
                <Image
                  src={formation.image}
                  alt={formation.titre}
                  boxSize="300px"
                  objectFit="cover"
                />
              ) : (
                <Box boxSize="300px" bg="gray.200" />
              )}
              <Box>
                <Heading as="h3" size="lg">
                  {formation.titre}
                </Heading>
                <Text>{formation.description}</Text>
              </Box>
            </VStack>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default Formations;
