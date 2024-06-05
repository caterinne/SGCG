import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Pagination } from '@mui/material';
import { getHistorial } from '../services/historial';
import './historial.css';

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderData = (data) => {
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => (
        <Typography key={key} variant="body2">
          <strong>{key}:</strong> {Array.isArray(value) || typeof value === 'object' ? renderData(value) : value}
        </Typography>
      ));
    }
    return <Typography variant="body2">{data}</Typography>;
  };

  return (
    <div className="historial-container">
      <Grid container spacing={3}>
        {historial.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{row.tipo}</Typography>
                {renderData(row.datos)}
                <Typography variant="body2" color="textSecondary">
                  Eliminado el: {row.eliminado_el}
                </Typography>
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
  );
};

export default Historial;




