
import axios from 'axios';

export const registerUser = (userData) => axios.post('/api/register', userData);

export const loginUser = (credentials) => axios.post('/api/login', credentials);