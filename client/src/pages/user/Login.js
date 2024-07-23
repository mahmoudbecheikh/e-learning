import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; 

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({}); // État pour stocker les données de connexion des utilisateurs

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    if (!formData.email) {
      isvalid = false;
      validationErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Format d'email incorrect";
    }

    if (!formData.password) {
      isvalid = false;
      validationErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password =
        "Le mot de passe doit comporter au moins 6 caractères";
    }

    if (!isvalid) {
      setErrors(validationErrors);
      setValid(isvalid);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Utilisez formData au lieu de e
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error during login:",
          errorData.message || "Failed to sign in. Please try again later."
        );
        alert("mot de passe incorrect! Réessayez"); // Affiche une alerte lorsque la connexion est réussie
      } else {
        const responseData = await response.json();
        console.log("Login successful! Received token:", responseData.token);
        localStorage.setItem("token", responseData.token);
        try {
            const decodedToken = jwtDecode(responseData.token);
            localStorage.setItem("email", decodedToken.email);
            localStorage.setItem("id", decodedToken.sub);
          } catch (error) {
            console.error('Invalid token:', error);
          }
        alert("Connexion réussie !"); // Affiche une alerte lorsque la connexion est réussie
        navigate("/");
      }
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Assurez-vous que l'élément prend toute la hauteur de la vue
        }}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="signup-form">
              <div style={{ textAlign: "center" }}>
                {" "}
                {/* Centre les éléments dans le conteneur parent */}
                <h4
                  style={{
                    fontSize: "20px",
                    margin: "10px 0",
                  }}
                >
                  Login
                </h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Email */}
                  <div className="mb-3 col-md-12">
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel>
                        Email <span className="text-danger">*</span>
                      </FormLabel>
                      <Input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Entrez l'email"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            email: event.target.value,
                          })
                        }
                      />
                      <Box height="20px" position="relative">
                        <FormErrorMessage
                          position="absolute"
                          bottom="0"
                          fontSize="xs"
                        >
                          {errors.email}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  </div>

                  {/* Password */}
                  <div className="mb-3 col-md-12">
                    <FormControl isInvalid={!!errors.password}>
                      <FormLabel>
                        Password <span className="text-danger">*</span>
                      </FormLabel>
                      <Input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Entrez le mot de passe"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            password: event.target.value,
                          })
                        }
                      />
                      <Box height="20px" position="relative">
                        <FormErrorMessage
                          position="absolute"
                          bottom="0"
                          fontSize="xs"
                        >
                          {errors.password}
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                    <Link
                      to="/reset-password-request"
                      style={{ marginLeft: "6px" }}
                    >
                      <button style={{ color: "red" }}>
                        mot de passe oublié
                      </button>
                    </Link>
                  </div>
                  <div className="col-md-12 text-center">
                    <Button type="submit" colorScheme="blue">
                      Connexion
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
