import React, { useState, useEffect } from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import { Profiler } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; // Importer les icônes de flèche

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre le numéro de la page actuelle
  const clientsPerPage = 4; // Nombre d'utilisateurs à afficher par page

  useEffect(() => {
    fetchClients();
  }, []);

  const logTimes = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.table({ id, phase, actualDuration, baseDuration, startTime, commitTime });
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/client');
      if (!response.ok) {
        throw new Error('Error fetching clients');
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteClient = async (_id) => {
    try {
      if (!_id) {
        console.error('Invalid id:', _id);
        return;
      }

      const response = await fetch(`http://localhost:5000/auth/users/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting client');
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 

      await fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error.message);
    }
  };

  const handleShowDetails = (client) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedClient(null);
  };

  const handleDeleteConfirmation = (_id) => {
    setClientToDelete(_id);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteClient(clientToDelete);
    setDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setClientToDelete(null);
    setDeleteConfirmation(false);
  };

  // Calcule l'index du premier et du dernier utilisateur sur la page actuelle
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;

  // Utilise la méthode slice pour extraire les utilisateurs à afficher sur la page actuelle
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  // Change de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Profiler id='RegisterForm' onRender={logTimes}>
      <Box p={6} borderRadius="lg" boxShadow="md" bg="white" width={1170}>
        <h2>Client List</h2>
        <TableContainer>
          <Table>
            <TableCaption>Clients</TableCaption>
            <Thead>
              <Tr>
                <Th>nom</Th>
                <Th>prenom</Th>
                <Th>email</Th>
                <Th>num tel</Th>
                <Th>cin</Th>
                <Th>secteur</Th>
                <Th>nom entreprise</Th>
                <Th>poste</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentClients.map((client) => (
                <Tr key={client._id}>
                  <Td>{client.nom}</Td>
                  <Td>{client.prenom}</Td>
                  <Td>{client.email}</Td>
                  <Td>{client.numtel}</Td>
                  <Td>{client.cin}</Td>
                  <Td>{client.secteur}</Td>
                  <Td>{client.nomEntreprise}</Td>
                  <Td>{client.poste}</Td>

                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteConfirmation(client._id)}>Delete</Button>
                    <Button colorScheme="teal" onClick={() => handleShowDetails(client)}>Details</Button>
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
            Client deleted successfully
          </Alert>
        )}
        {/* Affiche la modal de détails si showDetailsModal est true */}
        {selectedClient && (
          <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Client Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>nom: {selectedClient.nom}</p>
                <p>prenom: {selectedClient.prenom}</p>
                <p>email: {selectedClient.email}</p>
                <p>numéro de tél: {selectedClient.numtel}</p>
                <p>cin: {selectedClient.cin}</p>
                <p>secteur: {selectedClient.secteur}</p>
                <p>nom entreprise: {selectedClient.nomEntreprise}</p>
                <p>poste: {selectedClient.poste}</p>
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
              Are you sure you want to delete this client?
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
          <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastClient >= clients.length} rightIcon={<AiOutlineArrowRight />} mx={1}>
          </Button>
        </Flex>
      </Box>
    </Profiler>
  );
};

export default ClientList;
