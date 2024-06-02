import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './LOGIN/login';
import HomePage from './PAGE/homepage';
import ConvenioDetalle from './convenios/ConvenioDetalle/convenioDetalle';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/convenio-detalle/:id" element={<ConvenioDetalle />} />
      </Routes>
    </div>
  );
};

export default App;
