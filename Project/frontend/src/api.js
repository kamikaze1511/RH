import axios from 'axios';

// Create an instance of axios with the base URL of your backend
const API = axios.create({ baseURL: 'http://localhost:5000' });

// Student Registration
export const registerStudent = (formData) => API.post('/auth/register-student', formData);

// Researcher Registration
export const registerResearcher = (formData) => API.post('/auth/register-researcher', formData);

export const getUsers = () => API.get('/users/get-users');
