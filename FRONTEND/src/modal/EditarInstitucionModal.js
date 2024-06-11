import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { updateInstitucion } from '../services/instituciones';

const EditarInstitucionModal = ({ open, onClose, institucion, onInstitucionUpdated }) => {
  const [nombreInstitucion, setNombreInstitucion] = useState('');
  const [pais, setPais] = useState('');
  const [tipoInstitucion, setTipoInstitucion] = useState('');
  const [departamento, setDepartamento] = useState('');

  useEffect(() => {
    if (institucion) {
      setNombreInstitucion(institucion.nombre_institucion);
      setPais(institucion.pais);
      setTipoInstitucion(institucion.tipo_institucion);
      setDepartamento(institucion.departamento);
    }
  }, [institucion]);

  const handleSave = async () => {
    try {
      const updatedInstitucion = {
        nombre_institucion: nombreInstitucion,
        pais,
        tipo_institucion: tipoInstitucion,
        departamento,
      };

      await updateInstitucion(institucion._id, updatedInstitucion);
      onInstitucionUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar la institución:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6" component="h2">
          Editar Institución
        </Typography>
        <TextField
          label="Nombre de la Institución"
          fullWidth
          value={nombreInstitucion}
          onChange={(e) => setNombreInstitucion(e.target.value)}
        />
        <TextField
          label="País"
          fullWidth
          value={pais}
          onChange={(e) => setPais(e.target.value)}
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
        <Box mt={2}>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
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

export default EditarInstitucionModal;