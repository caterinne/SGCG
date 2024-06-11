import { API_URL } from '../config';
import { toast } from 'react-toastify';

export const getCoordinadores = async () => {
    const response = await fetch(`${API_URL}/Coordinadores`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getCoordinadorById = async (id) => {
    const response = await fetch(`${API_URL}/Coordinadores/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteCoordinador = async (id) => {
    const response = await fetch(`${API_URL}/Coordinadores/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addCoordinador = async (coordinador) => {
    try {
      const response = await fetch(`${API_URL}/Coordinadores/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinador),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(`Coordinador(a) ${coordinador.nombre} ${coordinador.apellido} agregado correctamente`);
      return data;
    } catch (error) {
      toast.error('Error al agregar coordinador');
      throw error;
    }
  };

export const updateCoordinador = async (id, coordinador) => {
    const response = await fetch(`${API_URL}/Coordinadores/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinador),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getCoordinadoresByInstitucion = async (institucionId) => {
    const response = await fetch(`${API_URL}/coordinadores/institucion/${institucionId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};