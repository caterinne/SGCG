import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './LOGIN/login';
import HomePage from './PAGE/homepage';
import ConvenioDetalle from './convenios/ConvenioDetalle/convenioDetalle';
import Instituciones from './instituciones/institucion';
import Coordinadores from './coordinadores/coordinador';
import Historial from './historial/historial';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute component={HomePage} />} />
        <Route path="/convenio-detalle/:id" element={<ProtectedRoute component={ConvenioDetalle} />} />
        <Route path="/instituciones" element={<ProtectedRoute component={Instituciones} />} />
        <Route path="/coordinadores" element={<ProtectedRoute component={Coordinadores} />} />
        <Route path="/historial" element={<ProtectedRoute component={Historial} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
