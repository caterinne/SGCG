import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { TextField, Menu, MenuItem, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginService from '../services/LoginService';
import AgregarConvenioModal from '../modal/AgregarConvenioModal';
import AgregarInstitucionModal from '../modal/AgregarInstitucionModal';
import AgregarCoordinadorModal from '../modal/AgregarCoordinadorModal';
import AgregarUsuarioModal from '../modal/AgregarUsuarioModal';
import logo from '../assets/Convenios.png';
import './header.css';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ffede0',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffede0',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffede0',
    },
    '&:hover fieldset': {
      borderColor: '#ffede0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffede0',
    },
  },
});

const handleLogout = () => {
  LoginService.logout();
  window.location.href = '/';
};
const handlePerfil = () => {
  window.location.href = '/perfil';
};
const Header = ({ filter, onFilterChange }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = LoginService.getUserRole();
    setUserRole(role);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState({
    convenio: false,
    institucion: false,
    coordinador: false,
    usuario: false,
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    setModalOpen((prev) => ({ ...prev, [action]: true }));
    handleMenuClose();
  };

  const handleModalClose = (action) => {
    setModalOpen((prev) => ({ ...prev, [action]: false }));
  };

  return (
    <div className="header-container0">
      <img src={logo} title='SGCU' alt="Logo1" className="logo1" />
      <div className="search-bar">
        <CssTextField
          label="Buscar por alcance, institución, país, convenio, vigencia..."
          variant="outlined"
          fullWidth
          size="small"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          InputLabelProps={{
            style: { color: '#ffede0' },
          }}
        />
      </div>
      <div className="user-actions">
        {(userRole === 'admin' || userRole === 'user') && (
          <Button onClick={handleMenuOpen}>Agregar</Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('convenio')}>Agregar convenios</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('institucion')}>Agregar institución</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('coordinador')}>Agregar coordinador</MenuItem>
          {userRole === 'admin' && (
            <MenuItem onClick={() => handleMenuItemClick('usuario')}>Agregar usuarios</MenuItem>
          )}
        </Menu>
        <FontAwesomeIcon icon={faUser} title="Perfil" className="userIcon" onClick={handlePerfil}/>
        <FontAwesomeIcon icon={faRightFromBracket} title="Cerrar sesión" className="logoutIcon" onClick={handleLogout} />
      </div>

      <AgregarConvenioModal open={modalOpen.convenio} onClose={() => handleModalClose('convenio')} />
      <AgregarInstitucionModal open={modalOpen.institucion} onClose={() => handleModalClose('institucion')} />
      <AgregarCoordinadorModal open={modalOpen.coordinador} onClose={() => handleModalClose('coordinador')} />
      <AgregarUsuarioModal open={modalOpen.usuario} onClose={() => handleModalClose('usuario')} />
    </div>
  );
};

export default Header;
