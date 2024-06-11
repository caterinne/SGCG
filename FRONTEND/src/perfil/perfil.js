import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faBuilding, faHouse, faBuildingUser} from '@fortawesome/free-solid-svg-icons';
import Header from '../header/headerSec';
import styles from './perfil.css';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      setUser(userData);
    };

    fetchUser();
  }, []);

  const verUsuarios = () => {
    navigate('/usuarios');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Header />

      <nav className={styles.nav}>
      <h1 className="perfilTitulo">Mi cuenta</h1>
        <div className="dock-container6">
          <FontAwesomeIcon icon={faHouse} title="Página Principal" className="dock-icon6" onClick={() => handleNavigate('/home')} />
          <FontAwesomeIcon icon={faBuilding} title="Instituciones" className="dock-icon6" onClick={() => handleNavigate('/instituciones')} />
          <FontAwesomeIcon icon={faBuildingUser} title="Coordinadores" className="dock-icon6" onClick={() => handleNavigate('/coordinadores')} />
          <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="dock-icon6" onClick={() => handleNavigate('/historial')} />
        </div>
        <div className={styles.informeContainer}>
          {user && (
            <Paper className={styles.informe}>
              <Typography variant="h5" className={styles.nombre}><b>{user.name} {user.lastname}</b></Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Role de usuario</strong></TableCell>
                      <TableCell>{user.rol}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {user.rol === 'admin' && (
                <div className={styles.buttonContainer}>
                  <Button variant="contained" color="primary" onClick={verUsuarios}>
                    Ver Usuarios
                  </Button>
                </div>
              )}
            </Paper>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Perfil;