import { API_URL } from '../config';
import { toast } from 'react-toastify';

export const getConvenios = async () => {
    const response = await fetch(`${API_URL}/Convenios`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getConvenioById = async (id) => {
    const response = await fetch(`${API_URL}/Convenios/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteConvenio = async (id) => {
    const response = await fetch(`${API_URL}/Convenios/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const updateConvenio = async (id, convenio) => {
    const response = await fetch(`${API_URL}/Convenios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convenio),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addConvenio = async (convenio) => {
    try {
      const response = await fetch(`${API_URL}/Convenios/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convenio),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(`Convenio "${convenio.nombre_convenio}" agregado correctamente`);
      return data;
    } catch (error) {
      toast.error('Error al agregar convenio');
      throw error;
    }
  };