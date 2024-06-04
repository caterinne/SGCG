import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConvenioById } from '../../services/convenios';
import Header from '../../header/headerSec';
import './convenioDetalle.css';

const ConvenioDetalle = () => {
  const { id } = useParams();
  const [convenio, setConvenio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConvenio = async () => {
      try {
        const data = await getConvenioById(id);
        setConvenio(data);
      } catch (error) {
        setError('Error al obtener los detalles del convenio');
      } finally {
        setLoading(false);
      }
    };

    fetchConvenio();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div>
        <Header/>
        <div className="convenio-detalle-container">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header/>
        <div className="convenio-detalle-container">{error}</div>
      </div>
    );
  }

  if (!convenio) {
    return (
      <div>
        <Header/>
        <div className="convenio-detalle-container">No se encontró el convenio</div>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="convenio-detalle-container">
        <div className="convenio-detalle-header">
          <h1>Detalles de {convenio.nombre_convenio}</h1>
        </div>
        <div className="convenio-detalle-content">
          <div className="convenio-detalle-section">
            <div className="convenio-detalle-item">
              <strong>Tipo de Convenio:</strong> <p>{convenio.tipo_convenio}</p>
            </div>
            <div className="convenio-detalle-item">
              <strong>Alcance:</strong> <p>{convenio.alcance}</p>
            </div>
            <div className="convenio-detalle-item">
              <strong>Vigencia:</strong> <p>{formatDate(convenio.vigencia)}</p>
            </div>
            <div className="convenio-detalle-item">
              <strong>Año de Firma:</strong> <p>{convenio.ano_firma}</p>
            </div>
            <div className="convenio-detalle-item">
              <strong>Tipo de Firma:</strong> <p>{convenio.tipo_firma}</p>
            </div>
            <div className="convenio-detalle-item">
              <strong>Cupos:</strong> <p>{convenio.cupos}</p>
            </div>
            <div className="convenio-detalle-item">
              <strong>Documentos:</strong> <p>{convenio.documentos}</p>
            </div>
          </div>
          <div className="convenio-detalle-section">
            <h2>Coordinador</h2>
              <div>
                <div className="convenio-detalle-item">
                  <strong>Nombre:</strong> <p>{convenio.coordinador.nombre} {convenio.coordinador.apellido}</p>
                </div>
                <div className="convenio-detalle-item">
                  <strong>Email:</strong> <p>{convenio.coordinador.email}</p>
                </div>
                <div className="convenio-detalle-item">
                  <strong>Tipo Coordinador:</strong> <p>{convenio.coordinador.tipo_coordinador}</p>
                </div>
              </div>
          </div>
          <div className="convenio-detalle-section">
            <h2>Institución</h2>
              <div>
                <div className="convenio-detalle-item">
                  <strong>Nombre:</strong> <p>{convenio.coordinador.institucion.nombre_institucion}</p>
                </div>
                <div className="convenio-detalle-item">
                  <strong>Tipo Institución:</strong> <p>{convenio.coordinador.institucion.tipo_institucion}</p>
                </div>
                <div className="convenio-detalle-item">
                  <strong>Departamento:</strong> <p>{convenio.coordinador.institucion.departamento}</p>
                </div>
                <div className="convenio-detalle-item">
                  <strong>País:</strong> <p>{convenio.coordinador.institucion.pais}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvenioDetalle;