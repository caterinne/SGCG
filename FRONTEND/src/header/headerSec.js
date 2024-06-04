import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

import './headerSec.css';

const Header = ({ filter, onFilterChange }) => {
  return (
    <div className="header-container">
      <div className="logo">LOGO</div>
      <div className="user-actions">
        <button>Agregar</button>
        <FontAwesomeIcon icon={faUser} className="icon user-icon" />
        <FontAwesomeIcon icon={faRightFromBracket} className="icon settings-icon" />
      </div>
    </div>
  );
};

export default Header;