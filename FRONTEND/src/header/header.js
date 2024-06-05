import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginService from '../services/LoginService';
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

const Header = ({ filter, onFilterChange }) => {
  return (
    <div className="header-container">
      <div className="logo" title="Inicio" >LOGO</div>
      <div className="search-bar">
        <CssTextField
          label="Buscar por alcance, institución, país, convenio, vigencia..."
          variant="outlined"
          fullWidth
          size="small"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          InputLabelProps={{
            style: { color: '#ffede0' }
          }}
        />
      </div>
      <div className="user-actions">
        <button>Agregar</button>
        <FontAwesomeIcon icon={faUser} title="Perfil" className="icon user-icon" />
        <FontAwesomeIcon icon={faRightFromBracket} title="Cerrar sesión" className="icon settings-icon" onClick={handleLogout} />
      </div>
    </div>
  );
};


export default Header;