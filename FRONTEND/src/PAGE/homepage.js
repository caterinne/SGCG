import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Convenio from '../convenios/convenio';
import './homepage.css';
import { IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#f6e8df';
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <div className="header-row">
        <h1 className="convenio-titulo">Convenios</h1>
        <div className="button-container">
          <IconButton color="primary" title="Instituciones" onClick={() => handleNavigate('/instituciones')}>
            <SchoolIcon />
          </IconButton>
          <IconButton color="secondary" title="Coordinadores" onClick={() => handleNavigate('/coordinadores')}>
            <GroupIcon />
          </IconButton>
          <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="icon-container" onClick={() => handleNavigate('/historial')}/>
        </div>
      </div>
      <nav id="convenios">
        <Convenio />
      </nav>
      <nav id="content">
      </nav>
    </div>
  );
};

export default HomePage;