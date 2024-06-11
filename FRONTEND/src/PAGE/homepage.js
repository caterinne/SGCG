import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Convenio from '../convenios/convenio';
import './homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faBuilding, faHouse, faBuildingUser} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#f6e8df';
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container1">
      <header>
        <Header />
      </header>
      <div className="main-content">
      <div className="dock-container">
          <FontAwesomeIcon icon={faHouse} title="Página Principal" className="dock-icon" onClick={() => handleNavigate('/home')} />
          <FontAwesomeIcon icon={faBuilding} title="Instituciones" className="dock-icon" onClick={() => handleNavigate('/instituciones')} />
          <FontAwesomeIcon icon={faBuildingUser} title="Coordinadores" className="dock-icon" onClick={() => handleNavigate('/coordinadores')} />
          <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="dock-icon" onClick={() => handleNavigate('/historial')} />
      </div>
        <div className="tablaConv">
          <h1 className="convTitulo">Convenios</h1>
          <nav id="convenios">
            <Convenio />
          </nav>
        </div>
      </div>
      <nav id="content">
      </nav>
    </div>
  );
};

export default HomePage;