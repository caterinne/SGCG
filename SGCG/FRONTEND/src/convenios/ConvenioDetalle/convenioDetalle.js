import React from 'react';
import { useParams } from 'react-router-dom';

const ConvenioDetalle = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Detalles del Convenio {id}</h1>
      {/* Aquí puedes añadir más detalles o lógica para mostrar la información completa del convenio */}
    </div>
  );
};

export default ConvenioDetalle;
