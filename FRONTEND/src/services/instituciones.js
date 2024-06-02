import { API_URL } from '../config';

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
