import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getHistorialRenovaciones } from '../services/convenios';

function formatFecha(fecha) {
    const dateObj = new Date(fecha);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

const HistorialRenovacionesModal = ({ open, onClose, convenioId }) => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const fetchHistorial = async () => {
            if (convenioId) {
                try {
                    const data = await getHistorialRenovaciones(convenioId);
                    setHistorial(data);
                } catch (error) {
                    console.error('Error fetching historial de renovaciones:', error);
                }
            }
        };

        fetchHistorial();
    }, [convenioId]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...style, width: 400 }}>
                <Typography variant="h6" component="h2">
                    Historial de Renovaciones
                </Typography>
                <List>
                    {historial.map((renovacion, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`Fecha renovación: ${formatFecha(renovacion.fechaRenovacion)}`} />
                            <ListItemText primary={`Vigencia: ${formatFecha(renovacion.nuevaVigencia)}`} />
                        </ListItem>
                    ))}
                </List>
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
    boxShadow: 24,
    p: 4,
};

export default HistorialRenovacionesModal;
