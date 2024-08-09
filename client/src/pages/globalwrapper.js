import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({}); // pour la fonction update 
    
    const [admins, setAdmins] = useState([]);
    const [admin, setAdmin] = useState({}); // pour la fonction update 

    const [evaluations, setEvaluations] = useState([]);
    const [evaluation, setEvaluation] = useState({});

    const [quizzes, setQuizzes] = useState([]);
  const [quizz, setQuizz] = useState({});

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
    

const API_URL = 'http://localhost:5000'; 

 const getAllEvaluations = async () =>{ 
  try {
    const res= await axios.get(`${API_URL}/evaluations`);
    setEvaluations(res.data);
  } catch(err) {
    console.error(err);
  }
  };



//  const getEvaluationById = async (id) => {
//   try{
//     const res= await axios.get(`${API_URL}/evaluations/${id}`);
//     setEvaluation(res.data);
//     return res.data;
//     }catch (err) {
//       console.error(err);
//     }
//   };

  const getEvaluationById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/evaluations/${id}`);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err; // Assure-toi que l'erreur est propagée correctement
    }
  };
  
  const createEvaluation = async (data) => {
    const response = await axios.post(`${API_URL}/evaluations`, data);
    return response.data;
  };
  
  const updateEvaluation = async (id, data) => {
    const response = await axios.put(`${API_URL}/evaluations/${id}`, data);
    return response.data;
  };
  
  const deleteEvaluation = async (id) => {
    const response = await axios.delete(`${API_URL}/evaluations/${id}`);
    return response.data;
  };
  
  const getEvaluationsByNiveau = async (niveauId) => {
    const response = await axios.get(`${API_URL}/evaluations/niveau/${niveauId}`);
    return response.data;
  };
  
  const addEvaluationToNiveau = async (niveauId, data) => {
    const response = await axios.post(`${API_URL}/evaluations/${niveauId}`, data);
    return response.data;
  };
  
 const getEvaluationsByNiveauId = async (niveauId) => {
  const response = await axios.get(`http://localhost:5000/evaluations/niveau/${niveauId}`);
  return response;
};

const fetchQuizzes = async () => {
  try {
    const res = await axios.get(`${API_URL}/quizz`);
    setQuizzes(res.data);
  } catch (err) {
    console.error(err);
  }
};

const getQuizzById = async (id) => {
  try {
      const res = await axios.get(`${API_URL}/quizz/${id}`);
      setQuizz(res.data);
      return res.data;
  } catch (err) {
      console.error(err);
  }
};

const handleCreateQuizz = async (quizzData, setForm) => {
  try {
    const res = await axios.post(`${API_URL}/quizz`, quizzData);
    setQuizzes([...quizzes, res.data]);
    toast({
      title: 'Quizz Created',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    setErrors({});
    setForm({});
    onClose();
  } catch (err) {
    setErrors(err.response.data.error);
  }
};

// const handleUpdateQuizz = async (id, quizzData) => {
//   try {
//     const res = await axios.put(`${API_URL}/quizz/${id}`, quizzData);
//     setQuizzes(quizzes.map((q) => (q._id === id ? res.data : q)));
//     toast({
//       title: 'Quizz Updated',
//       status: 'success',
//       duration: 4000,
//       isClosable: true,
//     });
//   } catch (err) {
//     setErrors(err.response.data.error);
//   }
// };

// const handleUpdateQuizz = async (id, updatedQuizz) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/quizz/${id}`, updatedQuizz);
//     setQuizz((prevQuizz) =>
//       prevQuizz.map((quiz) => (quiz._id === id ? response.data : quiz))
//     );
//   } catch (error) {
//     console.error("Failed to update quizz:", error);
//     throw error;
//   }
// };

const handleUpdateQuizz = async (id, data) => {
  const response = await axios.put(`${API_URL}/quizz/${id}`, data);
  return response.data;
};

const handleDeleteQuizz = async (id) => {
  try {
    await axios.delete(`${API_URL}/quizz/${id}`);
    setQuizzes(quizzes.filter((q) => q._id !== id));
    toast({
      title: 'Quizz Deleted',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    setErrors(err.response.data.error);
  }
};

const addQuizzToNiveau = async (niveauId, data) => {
  const response = await axios.post(`${API_URL}/quizz/${niveauId}`, data);
  return response.data;
};

// const getQuizzByNiveauId = async (niveauId) => {
//   try {
//     const response = await axios.get(`${API_URL}/quizz/niveau/${niveauId}`);
//     setQuizzes(response.data);
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);
//   }
// };

const getQuizzByNiveauId = async (niveauId) => {
  const response = await axios.get(`http://localhost:5000/quizz/niveau/${niveauId}`);
  return response;
};

    return (
        <GlobalContext.Provider value={{ 
          getAllEvaluations,
          getEvaluationById,
          createEvaluation,
          updateEvaluation,
          deleteEvaluation,
          getEvaluationsByNiveau,
          addEvaluationToNiveau,
          getEvaluationsByNiveauId,
            users, 
            AddUser, 
            isOpen,
            onOpen,
            onClose,
            errors,
            setErrors,
            user,
            setUser,
            quizzes,
            quizz,
            fetchQuizzes,
            getQuizzById,
            handleCreateQuizz,
            handleUpdateQuizz,
            handleDeleteQuizz,
            addQuizzToNiveau,
            getQuizzByNiveauId
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
