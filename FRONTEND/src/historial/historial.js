import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Pagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faBuilding, faHouse, faBuildingUser} from '@fortawesome/free-solid-svg-icons';
import { getHistorial } from '../services/historial';
import { useNavigate } from 'react-router-dom';
import Header from '../header/headerSec';
import './historial.css';

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await getHistorial();
        setHistorial(data);
      } catch (error) {
        console.error('Error fetching historial:', error);
      }
    };

    fetchHistorial();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  function formatFecha(fecha) {
    const dateObj = new Date(fecha);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderData = (row) => {
    if (row.tipo === 'Convenio') {
      const { convenio } = row.datos || {};
      if (!convenio) {
        return <Typography variant="body2">Datos no disponibles</Typography>;
      }

      const { 
        nombre_convenio, tipo_convenio, alcance, vigencia, ano_firma, tipo_firma, cupos, documentos, 
        coordinador = {}
      } = convenio;
      
      const institucion = coordinador.institucion || {};
      
      return (
        <>
          <Typography variant="body2">
            <strong>Nombre del Convenio:</strong> {nombre_convenio || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Convenio:</strong> {tipo_convenio || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Alcance:</strong> {alcance || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Vigencia:</strong> {vigencia ? formatFecha(vigencia) : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Año de Firma:</strong> {ano_firma || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Firma:</strong> {tipo_firma || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Cupos:</strong> {cupos || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Documentos:</strong> {documentos || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Coordinador:</strong> {coordinador.nombre ? `${coordinador.nombre} ${coordinador.apellido}` : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {coordinador.email || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Coordinador:</strong> {coordinador.tipo_coordinador || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Institución:</strong> {institucion.nombre_institucion || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Institución:</strong> {institucion.tipo_institucion || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Departamento:</strong> {institucion.departamento || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>País:</strong> {institucion.pais || 'N/A'}
          </Typography>
          <Typography variant="body2" color="blue">
            Convenio Eliminado el: {row.eliminado_el || 'N/A'}
          </Typography>
        </>
      );
    } else if (row.tipo === 'Institucion') {
      const { institucion } = row.datos || {};
      if (!institucion) {
        return <Typography variant="body2">Datos no disponibles</Typography>;
      }

      const coordinador = row.datos.coordinadores?.[0] || {};
      const convenio = row.datos.convenios?.[0] || {};

      return (
        <>
          <Typography variant="body2">
            <strong>Nombre de la Institución:</strong> {institucion.nombre_institucion || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Institución:</strong> {institucion.tipo_institucion || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Departamento:</strong> {institucion.departamento || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>País:</strong> {institucion.pais || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Coordinador:</strong> {coordinador.nombre ? `${coordinador.nombre} ${coordinador.apellido}` : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {coordinador.email || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Coordinador:</strong> {coordinador.tipo_coordinador || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Convenio:</strong> {convenio.nombre_convenio || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Convenio:</strong> {convenio.tipo_convenio || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Alcance:</strong> {convenio.alcance || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Vigencia:</strong> {convenio.vigencia ? new Date(convenio.vigencia).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Año de Firma:</strong> {convenio.ano_firma || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo de Firma:</strong> {convenio.tipo_firma || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Cupos:</strong> {convenio.cupos || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Documentos:</strong> {convenio.documentos || 'N/A'}
          </Typography>
          <Typography variant="body2" color="blue">
            Institución Eliminada el: {row.eliminado_el || 'N/A'}
          </Typography>
        </>
      );
    }
    return <Typography variant="body2">Datos no disponibles</Typography>;
  };

  return (
    <div>
      <Header />
      <div className="historial-container">
      <h1 className="histoTitulo">Historial de Convenios e Instituciones Eliminadas</h1>
        <div className="dock-container4">
          <FontAwesomeIcon icon={faHouse} title="Página Principal" className="dock-icon4" onClick={() => handleNavigate('/home')} />
          <FontAwesomeIcon icon={faBuilding} title="Instituciones" className="dock-icon4" onClick={() => handleNavigate('/instituciones')} />
          <FontAwesomeIcon icon={faBuildingUser} title="Coordinadores" className="dock-icon4" onClick={() => handleNavigate('/coordinadores')} />
          <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="dock-icon4" onClick={() => handleNavigate('/historial')} />
        </div>
        <Grid container spacing={3}>
          {historial.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row._id}>
              <Card>
                <CardContent>
                  {renderData(row)}
                </CardContent>
              </Card>
            </Grid>
          ))}
          {historial.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No se ha encontrado ningún resultado.
              </Typography>
            </Grid>
          )}
        </Grid>
        <Pagination
          count={Math.ceil(historial.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="pagination"
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </div>
  );
};

export default Historial;
