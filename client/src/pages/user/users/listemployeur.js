import React, { useContext,useState, useEffect } from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import { Profiler } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai'; // Importer les icônes de flèche
import { GlobalContext } from '../../globalwrapper';
import AddUser from './adduser';

const EmployeurList = () => {
  const [employeurs, setEmployeurs] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedEmployeur, setSelectedEmployeur] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [employeurToDelete, setEmployeurToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre le numéro de la page actuelle
  const employeursPerPage = 4; // Nombre d'utilisateurs à afficher par page
  const { onOpen} = useContext(GlobalContext);

  useEffect(() => {
    fetchEmployeurs();
  }, []);

  const logTimes = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.table({ id, phase, actualDuration, baseDuration, startTime, commitTime });
  };

  const fetchEmployeurs = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/employeur');
      if (!response.ok) {
        throw new Error('Error fetching employeurs');
      }
      const data = await response.json();
      setEmployeurs(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteEmployeur = async (_id) => {
    try {
      if (!_id) {
        console.error('Invalid id:', _id);
        return;
      }

      const response = await fetch(`http://localhost:5000/auth/users/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting employeur');
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 

      await fetchEmployeurs();
    } catch (error) {
      console.error('Error deleting employeur:', error.message);
    }
  };

  const handleShowDetails = (employeur) => {
    setSelectedEmployeur(employeur);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedEmployeur(null);
  };

  const handleDeleteConfirmation = (_id) => {
    setEmployeurToDelete(_id);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteEmployeur(employeurToDelete);
    setDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setEmployeurToDelete(null);
    setDeleteConfirmation(false);
  };

  // Calcule l'index du premier et du dernier utilisateur sur la page actuelle
  const indexOfLastEmployeur = currentPage * employeursPerPage;
  const indexOfFirstEmployeur = indexOfLastEmployeur - employeursPerPage;

  // Utilise la méthode slice pour extraire les utilisateurs à afficher sur la page actuelle
  const currentEmployeurs = employeurs.slice(indexOfFirstEmployeur, indexOfLastEmployeur);

  // Change de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Profiler id='RegisterForm' onRender={logTimes}>
      <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
        <h2>Employeur List</h2>
        <TableContainer>
          <Table>
            <TableCaption>Employeurs</TableCaption>
            <Thead>
              <Tr>
                <Th>nom</Th>
                <Th>prenom</Th>
                <Th>email</Th>
                <Th>num tel</Th>
                <Th>cin</Th>
                <Th>poste</Th>

                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentEmployeurs.map((employeur) => (
                <Tr key={employeur._id}>
                  <Td>{employeur.nom}</Td>
                  <Td>{employeur.prenom}</Td>
                  <Td>{employeur.email}</Td>
                  <Td>{employeur.numtel}</Td>
                  <Td>{employeur.cin}</Td>
                  <Td>{employeur.poste}</Td>

                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteConfirmation(employeur._id)}>Delete</Button>
                    <Button colorScheme="teal" onClick={() => handleShowDetails(employeur)}>Details</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {/* Affiche l'alerte si showAlert est true */}
        {showAlert && (
          <Alert status="success" variant="solid">
            <AlertIcon />
            Employeur deleted successfully
          </Alert>
        )}
        {/* Affiche la modal de détails si showDetailsModal est true */}
        {selectedEmployeur && (
          <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Employeur Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>nom: {selectedEmployeur.nom}</p>
                <p>prenom: {selectedEmployeur.prenom}</p>
                <p>email: {selectedEmployeur.email}</p>
                <p>numero tel: {selectedEmployeur.numtel}</p>
                <p>cin: {selectedEmployeur.cin}</p>
                <p>poste: {selectedEmployeur.poste}</p>

              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleCloseDetailsModal}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        {/* Modalité de confirmation pour la suppression d'utilisateur */}
        <Modal isOpen={deleteConfirmation} onClose={handleCancelDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this employeur?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>Confirm</Button>
              <Button colorScheme="blue" onClick={handleCancelDelete}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Pagination */}
        <Flex justifyContent="center" alignItems="center" mt="4">
          <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />} mx={1}>
          </Button>
          <Box mx="2" p="2" borderRadius="md" bgColor="teal" color="white">Page {currentPage}</Box>
          <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastEmployeur >= employeurs.length} rightIcon={<AiOutlineArrowRight />} mx={1}>
          </Button>
        </Flex>
      </Box>
    </Profiler>
  );
};

export default EmployeurList;
