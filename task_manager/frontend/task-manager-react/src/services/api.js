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

// Fetch all tasks
export const fetchTasks = async (token) => {
    return api.get('/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Fetch a single task by ID
export const fetchTaskById = async (taskId, token) => {
    return api.get(`/tasks/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Create a new task
export const createTask = async (taskData, token) => {
    return api.post('/tasks/', taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

// Update a task with PUT (replaces the entire task)
export const updateTask = async (taskId, taskData, token) => {
    return api.put(`/tasks/${taskId}/`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

// Partially update a task with PATCH
export const patchTask = async (taskId, taskData, token) => {
    return api.patch(`/tasks/${taskId}/`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

// Delete a task
export const deleteTask = async (taskId, token) => {
    return api.delete(`/tasks/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
