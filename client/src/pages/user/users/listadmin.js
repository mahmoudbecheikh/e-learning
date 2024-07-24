import React, { useState, useEffect, useContext } from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import { Profiler } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; // Importer les icônes de flèche
import { GlobalContext } from '../../globalwrapper';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre le numéro de la page actuelle
  const adminsPerPage = 4; // Nombre d'utilisateurs à afficher par page
  const { onOpen} = useContext(GlobalContext);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const logTimes = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.table({ id, phase, actualDuration, baseDuration, startTime, commitTime });
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/admin');
      if (!response.ok) {
        throw new Error('Error fetching admins');
      }
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteAdmin = async (_id) => {
    try {
      if (!_id) {
        console.error('Invalid id:', _id);
        return;
      }

      const response = await fetch(`http://localhost:5000/auth/users/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting admin');
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 

      await fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error.message);
    }
  };

  const handleShowDetails = (admin) => {
    setSelectedAdmin(admin);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedAdmin(null);
  };

  const handleDeleteConfirmation = (_id) => {
    setAdminToDelete(_id);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteAdmin(adminToDelete);
    setDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setAdminToDelete(null);
    setDeleteConfirmation(false);
  };

  // Calcule l'index du premier et du dernier utilisateur sur la page actuelle
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;

  // Utilise la méthode slice pour extraire les utilisateurs à afficher sur la page actuelle
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  // Change de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Profiler id='RegisterForm' onRender={logTimes}>
      <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
        <h2>Admin List</h2>
        <TableContainer>
          <Table>
            <TableCaption>Admins</TableCaption>
            <Thead>
              <Tr>
                <Th>nom</Th>
                <Th>prenom</Th>
                <Th>email</Th>
                <Th>num tel</Th>
                <Th>cin</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentAdmins.map((admin) => (
                <Tr key={admin._id}>
                  <Td>{admin.nom}</Td>
                  <Td>{admin.prenom}</Td>
                  <Td>{admin.email}</Td>
                  <Td>{admin.numtel}</Td>
                  <Td>{admin.cin}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteConfirmation(admin._id)}>Delete</Button>
                    <Button colorScheme="teal" onClick={() => handleShowDetails(admin)}>Details</Button>
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
            Admin deleted successfully
          </Alert>
        )}
        {/* Affiche la modal de détails si showDetailsModal est true */}
        {selectedAdmin && (
          <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Admin Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>nom: {selectedAdmin.nom}</p>
                <p>prenom: {selectedAdmin.prenom}</p>
                <p>email: {selectedAdmin.email}</p>
                <p>numero tel: {selectedAdmin.numtel}</p>
                <p>cin: {selectedAdmin.cin}</p>
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
              Are you sure you want to delete this admin?
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
          <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastAdmin >= admins.length} rightIcon={<AiOutlineArrowRight />} mx={1}>
          </Button>
        </Flex>
      </Box>
    </Profiler>
  );
};

export default AdminList;
