import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, Button, TextField, Grid
} from '@mui/material';
import { updateUsuario } from '../services/usuarios';

const EditarUsuarioModal = ({ open, onClose, usuario, onUsuarioUpdated }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setEmail(usuario.email);
      setRol(usuario.rol);
    }
  }, [usuario]);

  const handleSave = async () => {
    try {
      const updatedUsuario = {
        nombre,
        apellido,
        email,
        rol,
      };

      await updateUsuario(usuario._id, updatedUsuario);
      onUsuarioUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ color: '#1976d2', marginBottom: 2 }}>
          Editar Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              fullWidth
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              fullWidth
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button onClick={handleSave} variant="contained" color="primary">
                Guardar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default EditarUsuarioModal;