import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, Button, TextField, Grid
} from '@mui/material';
import { updateCoordinador } from '../services/coordinadores';

const EditarCoordinadorModal = ({ open, onClose, coordinador, onCoordinadorUpdated }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [tipo_coordinador, setTipoCoordinador] = useState('');

  useEffect(() => {
    if (coordinador) {
      setNombre(coordinador.nombre);
      setApellido(coordinador.apellido);
      setEmail(coordinador.email);
      setTipoCoordinador(coordinador.tipo_coordinador);
    }
  }, [coordinador]);

  const handleSave = async () => {
    try {
      const updatedCoordinador = {
        nombre,
        apellido,
        email,
        tipo_coordinador,
      };

      await updateCoordinador(coordinador._id, updatedCoordinador);
      onCoordinadorUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar el coordinador:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ color: '#1976d2', marginBottom: 2 }}>
          Editar Coordinador
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
              label="Tipo de Coordinador"
              fullWidth
              value={tipo_coordinador}
              onChange={(e) => setTipoCoordinador(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Institución"
              fullWidth
              value={coordinador.institucion.nombre_institucion}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="País"
              fullWidth
              value={coordinador.institucion.pais}
              InputProps={{
                readOnly: true,
              }}
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

export default EditarCoordinadorModal;

