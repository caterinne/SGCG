import { API_URL } from '../config';

export const getHistorial = async () => {
    const response = await fetch(`${API_URL}/Historial`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};