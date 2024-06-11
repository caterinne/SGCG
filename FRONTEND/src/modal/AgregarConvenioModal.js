import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { addConvenio } from '../services/convenios';
import { getInstituciones } from '../services/instituciones';
import { getCoordinadoresByInstitucion } from '../services/coordinadores';

const AgregarConvenioModal = ({ open, onClose }) => {
  const [nombre_convenio, setNombreConvenio] = useState('');
  const [tipo_convenio, setTipoConvenio] = useState('');
  const [alcance, setAlcance] = useState('');
  const [vigencia, setVigencia] = useState('');
  const [ano_firma, setAnoFirma] = useState('');
  const [tipo_firma, setTipoFirma] = useState('');
  const [cupos, setCupos] = useState('');
  const [documentos, setDocumentos] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [instituciones, setInstituciones] = useState([]);
  const [coordinador, setCoordinador] = useState('');
  const [coordinadores, setCoordinadores] = useState([]);

  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const data = await getInstituciones();
        setInstituciones(data);
      } catch (error) {
        console.error('Error al obtener instituciones:', error);
      }
    };

    fetchInstituciones();
  }, []);

  useEffect(() => {
    const fetchCoordinadores = async () => {
      if (institucion) {
        try {
          const data = await getCoordinadoresByInstitucion(institucion);
          setCoordinadores(data);
        } catch (error) {
          console.error('Error al obtener coordinadores:', error);
        }
      }
    };

    fetchCoordinadores();
  }, [institucion]);

  const handleSave = async () => {
    try {
      const nuevoConvenio = {
        nombre_convenio,
        tipo_convenio,
        alcance,
        vigencia,
        ano_firma,
        tipo_firma,
        cupos,
        documentos,
        coordinador,
      };

      await addConvenio(nuevoConvenio);
      onClose();
    } catch (error) {
      console.error('Error al agregar el convenio:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6" component="h2">
          Agregar Convenio
        </Typography>
        {/* Campos del formulario */}
        <TextField
          label="Nombre del Convenio"
          fullWidth
          value={nombre_convenio}
          onChange={(e) => setNombreConvenio(e.target.value)}
        />
        <TextField
          label="Tipo de Convenio"
          fullWidth
          value={tipo_convenio}
          onChange={(e) => setTipoConvenio(e.target.value)}
        />
        <TextField
          label="Alcance"
          fullWidth
          value={alcance}
          onChange={(e) => setAlcance(e.target.value)}
        />
        <TextField
          label="Vigencia"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={vigencia}
          onChange={(e) => setVigencia(e.target.value)}
        />
        <TextField
          label="Año de Firma"
          fullWidth
          value={ano_firma}
          onChange={(e) => setAnoFirma(e.target.value)}
        />
        <TextField
          label="Tipo de Firma"
          fullWidth
          value={tipo_firma}
          onChange={(e) => setTipoFirma(e.target.value)}
        />
        <TextField
          label="Cupos"
          fullWidth
          value={cupos}
          onChange={(e) => setCupos(e.target.value)}
        />
        <TextField
          label="Documentos"
          fullWidth
          value={documentos}
          onChange={(e) => setDocumentos(e.target.value)}
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
        <TextField
          select
          label="Coordinador"
          fullWidth
          value={coordinador}
          onChange={(e) => setCoordinador(e.target.value)}
        >
          {coordinadores.map((coord) => (
            <MenuItem key={coord._id} value={coord._id}>
              {coord.nombre} {coord.apellido}
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

export default AgregarConvenioModal;
