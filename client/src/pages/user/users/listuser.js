import React, { useState, useEffect } from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import { Profiler } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; // Importer les icônes de flèche

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre le numéro de la page actuelle
  const usersPerPage = 4; // Nombre d'utilisateurs à afficher par page

  useEffect(() => {
    fetchUsers();
  }, []);

  const logTimes = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.table({ id, phase, actualDuration, baseDuration, startTime, commitTime });
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteUser = async (_id) => {
    try {
      if (!_id) {
        console.error('Invalid id:', _id);
        return;
      }

      const response = await fetch(`http://localhost:5000/auth/users/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 

      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedUser(null);
  };

  const handleDeleteConfirmation = (_id) => {
    setUserToDelete(_id);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteUser(userToDelete);
    setDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setDeleteConfirmation(false);
  };

  // Calcule l'index du premier et du dernier utilisateur sur la page actuelle
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Utilise la méthode slice pour extraire les utilisateurs à afficher sur la page actuelle
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Profiler id='RegisterForm' onRender={logTimes}>
      <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
        <h2>User List</h2>
        <TableContainer>
          <Table>
            <TableCaption>Users</TableCaption>
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
              {currentUsers.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.nom}</Td>
                  <Td>{user.prenom}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.numtel}</Td>
                  <Td>{user.cin}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteConfirmation(user._id)}>Delete</Button>
                    <Button colorScheme="teal" onClick={() => handleShowDetails(user)}>Details</Button>
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
            User deleted successfully
          </Alert>
        )}
        {/* Affiche la modal de détails si showDetailsModal est true */}
        {selectedUser && (
          <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>User Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>Name: {selectedUser.nom}</p>
                <p>Email: {selectedUser.prenom}</p>
                <p>Address: {selectedUser.email}</p>
                <p>Age: {selectedUser.numtel}</p>
                <p>Role: {selectedUser.cin}</p>
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
              Are you sure you want to delete this user?
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
          <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= users.length} rightIcon={<AiOutlineArrowRight />} mx={1}>
          </Button>
        </Flex>
      </Box>
    </Profiler>
  );
};

export default UserList;
