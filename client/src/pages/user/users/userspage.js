import React, { useContext, useState } from "react";
import { Box, Button, Collapse, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddUser from "./adduser";
import { GlobalContext } from "../../../globalwrapper";

const Users = () => {
    const [isAdminOpen, setAdminOpen] = useState(false);
    const [isEmployeurOpen, setEmployeurOpen] = useState(false);
    const [isClientOpen, setClientOpen] = useState(false);
    const { onOpen} = useContext(GlobalContext);

    const toggleAdmin = () => setAdminOpen(!isAdminOpen);
    const toggleEmployeur = () => setEmployeurOpen(!isEmployeurOpen);
    const toggleClient = () => setClientOpen(!isClientOpen);
  
    return (
      <>

              <Button
                colorScheme="teal"
                variant="outline"
                maxW={'300px'}
                minW="150px"
                onClick={onOpen}
              >
                Add New Employeur
              </Button>
        <Box>
          <Button onClick={toggleAdmin} width={300}>Administrateurs</Button>
          <Collapse in={isAdminOpen} animateOpacity>
            <Box p='40px' color='white' mt='4' bg='teal.500' rounded='md' shadow='md'>
              <Text>Statistics :</Text> 
              <Button> <Link to="/listadmin">liste des admins</Link></Button>
            </Box>
          </Collapse>
        </Box>
  
        <Box>
          <Button onClick={toggleEmployeur} width={300}>Employeurs</Button>
          <Collapse in={isEmployeurOpen} animateOpacity>
            <Box p='40px' color='white' mt='4' bg='teal.500' rounded='md' shadow='md'>
              <Text>Statistics :</Text> 
              <Button> <Link to="/listemployeur"> liste des employeurs</Link></Button>
            </Box>
          </Collapse>
        </Box>
  
        <Box>
          <Button onClick={toggleClient} width={300}>Clients</Button>
          <Collapse in={isClientOpen} animateOpacity>
            <Box p='40px' color='white' mt='4' bg='teal.500' rounded='md' shadow='md'>
              <Text>Statistics :</Text> 
              <Button> <Link to="/listclient">liste des clients</Link></Button>
            </Box>
          </Collapse>
        </Box>

        <AddUser/>

      </>
    );
  }
  
  export default Users;
  