import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const RenovarConvenioModal = ({ open, convenio, onClose, onRenew }) => {
    const [vigencia, setVigencia] = useState('');

    const handleSubmit = () => {
        onRenew(convenio._id, vigencia);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Renovar Convenio</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nueva Vigencia"
                    type="date"
                    value={vigencia}
                    onChange={(e) => setVigencia(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Renovar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RenovarConvenioModal;