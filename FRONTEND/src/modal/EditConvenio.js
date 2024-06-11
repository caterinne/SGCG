import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Grid } from '@mui/material';
import { updateConvenio } from '../services/convenios';
import { getCoordinadoresByInstitucion } from '../services/coordinadores';

const EditarConvenioModal = ({ open, onClose, convenio, onConvenioUpdated }) => {
  const [nombre_convenio, setNombreConvenio] = useState('');
  const [tipo_convenio, setTipoConvenio] = useState('');
  const [alcance, setAlcance] = useState('');
  const [vigencia, setVigencia] = useState('');
  const [ano_firma, setAnoFirma] = useState('');
  const [tipo_firma, setTipoFirma] = useState('');
  const [cupos, setCupos] = useState('');
  const [documentos, setDocumentos] = useState('');
  const [coordinador, setCoordinador] = useState('');
  const [coordinadores, setCoordinadores] = useState([]);

  useEffect(() => {
    const fetchCoordinadores = async () => {
      if (convenio.coordinador.institucion._id) {
        try {
          const data = await getCoordinadoresByInstitucion(convenio.coordinador.institucion._id);
          setCoordinadores(data);
        } catch (error) {
          console.error('Error al obtener coordinadores:', error);
        }
      }
    };

    fetchCoordinadores();
  }, [convenio.coordinador.institucion._id]);

  useEffect(() => {
    if (convenio) {
      setNombreConvenio(convenio.nombre_convenio);
      setTipoConvenio(convenio.tipo_convenio);
      setAlcance(convenio.alcance);
      setVigencia(new Date(convenio.vigencia).toISOString().split('T')[0]);
      setAnoFirma(convenio.ano_firma);
      setTipoFirma(convenio.tipo_firma);
      setCupos(convenio.cupos);
      setDocumentos(convenio.documentos);
      setCoordinador(convenio.coordinador._id);
    }
  }, [convenio]);

  const handleSave = async () => {
    try {
      const updatedConvenio = {
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

      await updateConvenio(convenio._id, updatedConvenio);
      onConvenioUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar el convenio:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ color: 'black', marginBottom: 2 }}>
          Editar Convenio
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del Convenio"
              fullWidth
              value={nombre_convenio}
              onChange={(e) => setNombreConvenio(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tipo de Convenio"
              fullWidth
              value={tipo_convenio}
              onChange={(e) => setTipoConvenio(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Alcance"
              fullWidth
              value={alcance}
              onChange={(e) => setAlcance(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vigencia"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={vigencia}
              onChange={(e) => setVigencia(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Año de Firma"
              fullWidth
              value={ano_firma}
              onChange={(e) => setAnoFirma(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tipo de Firma"
              fullWidth
              value={tipo_firma}
              onChange={(e) => setTipoFirma(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cupos"
              fullWidth
              value={cupos}
              onChange={(e) => setCupos(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Documentos"
              fullWidth
              value={documentos}
              onChange={(e) => setDocumentos(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Institución"
              fullWidth
              value={convenio.coordinador.institucion.nombre_institucion}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Coordinador"
              fullWidth
              value={coordinador}
              onChange={(e) => setCoordinador(e.target.value)}
              margin="normal"
            >
              {coordinadores.map((coord) => (
                <MenuItem key={coord._id} value={coord._id}>
                  {coord.nombre} {coord.apellido}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined" color="secondary" sx={{ marginRight: 1 }}>
            Cancelar
          </Button>
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
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default EditarConvenioModal;
