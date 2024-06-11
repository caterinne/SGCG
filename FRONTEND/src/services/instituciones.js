import { API_URL } from '../config';
import { toast } from 'react-toastify';

export const getInstituciones = async () => {
    const response = await fetch(`${API_URL}/Instituciones`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getInstitucionesConCoordinadores = async () => {
    const response = await fetch(`${API_URL}/Instituciones/con-coordinadores`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getInstitucionById = async (id) => {
    const response = await fetch(`${API_URL}/Instituciones/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteInstitucion = async (id) => {
    const response = await fetch(`${API_URL}/Instituciones/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addInstitucion = async (institucion) => {
    try {
      const response = await fetch(`${API_URL}/Instituciones/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(institucion),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(`Institución "${institucion.nombre_institucion}" agregada correctamente`);
      return data;
    } catch (error) {
      toast.error('Error al agregar institución');
      throw error;
    }
  };

  export const updateInstitucion = async (id, updatedInstitucion) => {
    try {
      const response = await fetch(`${API_URL}/Instituciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInstitucion),
      });
  
      if (!response.ok) {
        throw new Error('Error updating institucion');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating institucion:', error);
      throw error;
    }
  };