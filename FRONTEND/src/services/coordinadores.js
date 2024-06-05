import { API_URL } from '../config';

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