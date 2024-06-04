import axios from 'axios';
import { API_URL } from '../config';

const login = async (email, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/Usuarios/login`, {
            email,
            contrasena
        });
        return response.data;
    } catch (error) {
        console.error('Error en el login:', error);
        return null;
    }
};

const getUserRole = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user ? user.rol : null;
};

const logout = () => {
    sessionStorage.removeItem('user');
};

const isAuthenticated = () => {
    return sessionStorage.getItem('user') !== null;
};

const LoginService = {
    login,
    getUserRole,
    logout,
    isAuthenticated
};

export default LoginService;