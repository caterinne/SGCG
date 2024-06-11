import { API_URL } from '../config';
import { toast } from 'react-toastify';

export const getUsuarios = async () => {
    const response = await fetch(`${API_URL}/Usuarios`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getUsuarioById = async (id) => {
    const response = await fetch(`${API_URL}/Usuarios/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addUsuario = async (usuario) => {
    try {
      const response = await fetch(`${API_URL}/Usuarios/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(`Usuario(a) ${usuario.nombre} ${usuario.apellido} agregado correctamente`);
      return data;
    } catch (error) {
      toast.error('Error al agregar usuario');
      throw error;
    }
  };

export const updateUsuario = async (id, usuario) => {
    const response = await fetch(`${API_URL}/Usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteUsuario = async (id) => {
    const response = await fetch(`${API_URL}/Usuarios/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};