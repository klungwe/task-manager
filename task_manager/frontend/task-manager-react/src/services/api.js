import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

export const registerUser = async (userData) => {
    return api.post('/accounts/register/', userData);
};

export const loginUser = async (credentials) => {
    return api.post('/token/', credentials);
};

export const fetchTasks = async (token) => {
    return api.get('/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createTask = async (taskData, token) => {
    return api.post('/tasks/', taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateTask = async (taskId, taskData, token) => {
    return api.patch(`/tasks/${taskId}/`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteTask = async (taskId, token) => {
    return api.delete(`/tasks/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
