import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { addInstitucion } from '../services/instituciones';

const AgregarInstitucionModal = ({ open, onClose }) => {
  const [nombreInstitucion, setNombreInstitucion] = useState('');
  const [tipoInstitucion, setTipoInstitucion] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [pais, setPais] = useState('');

  const handleSave = async () => {
    try {
      const nuevaInstitucion = {
        nombre_institucion: nombreInstitucion,
        tipo_institucion: tipoInstitucion,
        departamento: departamento,
        pais: pais,
      };

      await addInstitucion(nuevaInstitucion);
      onClose();
    } catch (error) {
      console.error('Error al agregar la institución:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6" component="h2">
          Agregar Institución
        </Typography>
        <TextField
          label="Nombre de la Institución"
          fullWidth
          value={nombreInstitucion}
          onChange={(e) => setNombreInstitucion(e.target.value)}
        />
        <TextField
          label="Tipo de Institución"
          fullWidth
          value={tipoInstitucion}
          onChange={(e) => setTipoInstitucion(e.target.value)}
        />
        <TextField
          label="Departamento"
          fullWidth
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
        />
        <TextField
          label="País"
          fullWidth
          value={pais}
          onChange={(e) => setPais(e.target.value)}
        />
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

export default AgregarInstitucionModal;