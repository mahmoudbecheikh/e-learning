import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel, Avatar, Select } from '@chakra-ui/react';
import { GlobalContext } from '../../../globalwrapper';
export default function AddUser() {
  const { isOpen, onClose, AddUser, Update, errors, setErrors, user } = useContext(GlobalContext);
  const [form, setForm] = useState({});


  // Fonction de validation du formulaire
  const validateForm = () => {
    const validationErrors = {};
    // Logique de validation du formulaire
    return validationErrors;
  };

  // Gérer les changements de champ
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour enregistrer le projet
  const onSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      AddUser(form, setForm);
    } else {
      setErrors(validationErrors);
    }
  };

  // Fonction pour mettre à jour le projet
  const onUpdate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      Update(form, setForm, form._id);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [isOpen, user]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={() => {
          onClose();
          setErrors({});
          setForm({});
        }} />
        <DrawerHeader>{form._id ? 'Update User' : 'Create User'}</DrawerHeader>

        <DrawerBody>
          <Stack spacing={'24px'}>
            <FormControl isInvalid={!!errors.nom}>
              <FormLabel>nom user</FormLabel>
              <Input name="nom" onChange={onChangeHandler} value={form?.nom || ''} />
              <FormErrorMessage>{errors.nom}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.prenom}>
              <FormLabel>prenom user</FormLabel>
              <Input name="prenom" onChange={onChangeHandler} value={form?.prenom || ''} />
              <FormErrorMessage>{errors.prenom}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input name="email" onChange={onChangeHandler} value={form?.email || ''} />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.numtel}>
              <FormLabel>numero de telephone </FormLabel>
              <Input name="numtel" onChange={onChangeHandler} value={form?.numtel || ''} />
              <FormErrorMessage>{errors.numtel}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.cin}>
              <FormLabel>cin</FormLabel>
              <Input name="cin" onChange={onChangeHandler} value={form?.cin || ''} />
              <FormErrorMessage>{errors.cin}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.poste}>
              <FormLabel>poste</FormLabel>
              <Input name="poste" onChange={onChangeHandler} value={form?.poste || ''} />
              <FormErrorMessage>{errors.poste}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.role}>
              <FormLabel>role</FormLabel>

              <Select
      placeholder='Select role'
      name="role"
      onChange={onChangeHandler}
      value={form.role}
    >
      <option value='admin'>Admin</option>
      <option value='employeur'>Employeur</option>
      <option value='client'>Client</option>
    </Select>
              {/* <Input name="role" onChange={onChangeHandler} value={form?.role || ''} /> */}
              <FormErrorMessage>{errors.role}</FormErrorMessage>
            </FormControl>

            
            <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password <span className="text-danger">*</span></FormLabel>
            <Input
                   type="password"
                   name="password"
                   placeholder="Enter Password"
                   onChange={onChangeHandler}
            />                                
           <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => {
            onClose();
            setErrors({});
            setForm({});
          }}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={() => (form._id ? onUpdate() : onSave())}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
