import React, { useEffect } from 'react';
import Header from '../header/header';
import Convenio from '../convenios/convenio';
import './homepage.css';

const HomePage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f6e8df';
  }, []);

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <nav id="convenios">
        <Convenio />
      </nav>
      <nav id="content">
        {/* Aquí puedes agregar el contenido adicional que desees */}
      </nav>
    </div>
  );
};

export default HomePage;
