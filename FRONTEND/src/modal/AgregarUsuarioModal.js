import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { addUsuario } from '../services/usuarios';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'viewer', label: 'Viewer' },
];

const AgregarUsuarioModal = ({ open, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('');

  const handleSave = async () => {
    try {
      const nuevoUsuario = {
        nombre,
        apellido,
        email,
        contrasena,
        rol,
      };

      await addUsuario(nuevoUsuario);
      onClose();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6" component="h2">
          Agregar Usuario
        </Typography>
        <TextField
          label="Nombre"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Apellido"
          fullWidth
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          fullWidth
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <TextField
          select
          label="Rol"
          fullWidth
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          {roles.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default AgregarUsuarioModal;