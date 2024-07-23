import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
    const [employeurs, setEmployeurs] = useState([]);
    const [employeur, setEmployeur] = useState({}); // pour la fonction update 
    
    const [admins, setAdmins] = useState([]);
    const [admin, setAdmin] = useState({}); // pour la fonction update 

    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    
    // const FetchEmployeurs = async () => {
    //     try {
    //         const res = await axios.get('/employeur');
    //         setEmployeurs(res.data);
    //     } catch (err) {
    //         console.log(err.response.data);
    //     }
    // };

    // const DeleteEmployeur = (id) => {
    //     axios
    //       .delete(`/employeur/${id}`)
    //       .then((res) => {
    //         setEmployeurs(employeurs.filter((u) => u._id !== id));
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

    const AddEmployeur = (form, setForm) => {
        axios
          .post('http://localhost:5000/auth/employeur', form)
          .then((res) => {
            setEmployeurs([...employeurs, res.data])
            toast({
              title: 'Employeur Added',
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


    const AddAdmin = (form, setForm) => {
      axios
        .post('http://localhost:5000/auth/admin', form)
        .then((res) => {
          setAdmins([...admins, res.data])
          toast({
            title: 'Admin Added',
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

//     const FindOneEmployeur = async (id) => {
//       try {
//           const res = await axios.get(`/employeur/${id}`);
//           setEmployeur(res.data);
//       } catch (err) {
//           console.log(err.response.data);
//       }
//   };
  

//     const Update = (form, setForm, id) => {
//       axios
//         .put(`/employeur/${id}`, form)
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
//           FetchEmployeurs();
//         })
//         .catch((err) => {
//           setErrors(err.response.data.error);
//         });
//     };
    
    return (
        <GlobalContext.Provider value={{ 
            // FetchEmployeurs, 
            employeurs, 
            // DeleteEmployeur, 
            AddEmployeur, 
            isOpen,
            onOpen,
            onClose,
            errors,
            setErrors,
            // FindOneEmployeur,
            employeur,
            setEmployeur,
            // Update
            AddAdmin
  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
