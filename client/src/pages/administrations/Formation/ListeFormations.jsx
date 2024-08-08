import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Input,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Alert,
  AlertIcon,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const FormationsList = () => {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);
  const formationsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const getFormations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/formation");
        setFormations(response.data);
      } catch (error) {
        console.error("Erreur de récupération des formations", error);
      }
    };

    getFormations();
  }, []);

  const filteredFormations = formations.filter((formation) =>
    formation.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/formation/${id}`);
      setFormations(formations.filter((formation) => formation._id !== id));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error("Erreur de suppression de la formation", error);
    }
  };

  // const handleShowDetails = (formation) => {
  //   setSelectedFormation(formation);
  //   setShowDetailsModal(true);
  // };

  const handleShowDetails = (formation) => {
    navigate(`/formationadmin/${formation._id}`);
  };
  
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedFormation(null);
  };

  const handleDeleteConfirmation = (id) => {
    setFormationToDelete(id);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await handleDelete(formationToDelete);
    setDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setFormationToDelete(null);
    setDeleteConfirmation(false);
  };

  const indexOfLastFormation = currentPage * formationsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  const currentFormations = filteredFormations.slice(
    indexOfFirstFormation,
    indexOfLastFormation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxWidth='500%'>
      <Heading as="h2" size="xl" mb={4}>
        Formations
      </Heading>
      <Input
        placeholder="Recherche formation"
        mb={4}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer width="200%" >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Titre</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentFormations.map((formation) => (
              <Tr key={formation._id}>
                <Td>
                  {formation.image ? (
                    <Image
                      src={formation.image}
                      alt={formation.titre}
                      boxSize="100px"
                      objectFit="cover"
                    />
                  ) : (
                    <Box boxSize="100px" bg="gray.200" />
                  )}
                </Td>
                <Td>{formation.titre}</Td>
                <Td>{formation.description}</Td>
                <Td>
                  <Flex>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      mr={2}
                      onClick={() => handleShowDetails(formation)}
                    >
                      Details
                    </Button>
                    
                   
                     <FontAwesomeIcon icon={faEdit}    
                      onClick={() =>
                        navigate(`/updateformation/${formation._id}`)
                      } style={{color:"black" ,width:"30px", marginTop:"5"}}
                     
                     />
                    
                  
                     
                     <FontAwesomeIcon icon={faTrash}  style={{color:"red" ,width:"30px",marginTop:"5"}}
                     onClick={() => handleDeleteConfirmation(formation._id)} />
                    
                     
                   
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {showAlert && (
        <Alert status="success" variant="solid">
          <AlertIcon />
          Formation deleted successfully
        </Alert>
      )}
      {selectedFormation && (
        <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Formation Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Id: {selectedFormation._id}</p>
              <p>Titre: {selectedFormation.titre}</p>
              <p>Description: {selectedFormation.description}</p>
              <p>Objectif: {selectedFormation.objectif}</p>
              <p>Compétence Acquises: {selectedFormation.competenceAquises}</p>
              <p>Résultat Souhaité: {selectedFormation.resultatSouhaites}</p>
              <p>Nombre de Niveaux: {selectedFormation.nbrNiveau}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseDetailsModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Modal isOpen={deleteConfirmation} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this formation?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
              Confirm
            </Button>
            <Button colorScheme="blue" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent="center" alignItems="center" mt="4">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          leftIcon={<AiOutlineArrowLeft />}
          mx={1}
        >
          Previous
        </Button>
        <Box mx="2" p="2" borderRadius="md" bgColor="teal" color="white">
          Page {currentPage}
        </Box>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastFormation >= filteredFormations.length}
          rightIcon={<AiOutlineArrowRight />}
          mx={1}
        >
          Next
        </Button>
      </Flex>
    </Container>
  );
};

export default FormationsList;
