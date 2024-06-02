import { API_URL } from '../config';

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
