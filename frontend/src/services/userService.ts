import api from './api';

export const userService = {
    login: async (data: { email: string, password: string }) => {
        const response = await api.post('/users/login', data);
        return response.data;
    },
    register: async (data: { username: string, email: string, password: string }) => {
        const response = await api.post('/users/register', data);
        return response.data;
    },
};
