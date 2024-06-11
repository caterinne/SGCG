import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { addCoordinador } from '../services/coordinadores';
import { getInstituciones } from '../services/instituciones';

const AgregarCoordinadorModal = ({ open, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [tipoCoordinador, setTipoCoordinador] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [instituciones, setInstituciones] = useState([]);

  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const data = await getInstituciones();
        setInstituciones(data);
      } catch (error) {
        console.error('Error al obtener las instituciones:', error);
      }
    };
    fetchInstituciones();
  }, []);

  const handleSave = async () => {
    try {
      const nuevoCoordinador = {
        nombre,
        apellido,
        email,
        tipo_coordinador: tipoCoordinador,
        institucion,
      };

      await addCoordinador(nuevoCoordinador);
      onClose();
    } catch (error) {
      console.error('Error al agregar el coordinador:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6" component="h2">
          Agregar Coordinador
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
          label="Tipo de Coordinador"
          fullWidth
          value={tipoCoordinador}
          onChange={(e) => setTipoCoordinador(e.target.value)}
        />
        <TextField
          select
          label="Institución"
          fullWidth
          value={institucion}
          onChange={(e) => setInstitucion(e.target.value)}
        >
          {instituciones.map((inst) => (
            <MenuItem key={inst._id} value={inst._id}>
              {inst.nombre_institucion}
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

export default AgregarCoordinadorModal;