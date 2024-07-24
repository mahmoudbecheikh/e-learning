import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({}); // pour la fonction update 
    
    const [admins, setAdmins] = useState([]);
    const [admin, setAdmin] = useState({}); // pour la fonction update 

    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    
    // const FetchUsers = async () => {
    //     try {
    //         const res = await axios.get('/user');
    //         setUsers(res.data);
    //     } catch (err) {
    //         console.log(err.response.data);
    //     }
    // };

    // const DeleteUser = (id) => {
    //     axios
    //       .delete(`/user/${id}`)
    //       .then((res) => {
    //         setUsers(users.filter((u) => u._id !== id));
    //         toast({
    //           title: 'User Deleted',
    //           status: 'success',
    //           duration: 4000,
    //           isClosable: true,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err.response.data);
    //       });
    // };

    const AddUser = (form, setForm) => {
        axios
          .post('http://localhost:5000/auth/user', form)
          .then((res) => {
            setUsers([...users, res.data])
            toast({
              title: 'User Added',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setErrors({});
            setForm({});
            onClose();
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
    };


//     const FindOneUser = async (id) => {
//       try {
//           const res = await axios.get(`/user/${id}`);
//           setUser(res.data);
//       } catch (err) {
//           console.log(err.response.data);
//       }
//   };
  

//     const Update = (form, setForm, id) => {
//       axios
//         .put(`/user/${id}`, form)
//         .then((res) => {
//           toast({
//             title: 'User Updated',
//             status: 'success',
//             duration: 4000,
//             isClosable: true,
//           });
//           setErrors({});
//           setForm({});
//           onClose();
//           FetchUsers();
//         })
//         .catch((err) => {
//           setErrors(err.response.data.error);
//         });
//     };
    
    return (
        <GlobalContext.Provider value={{ 
            users, 
            AddUser, 
            isOpen,
            onOpen,
            onClose,
            errors,
            setErrors,
            user,
            setUser,
  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
