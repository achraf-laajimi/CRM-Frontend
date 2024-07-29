import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/CRM';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface ErrorResponse {
  message?: string;
}

/* export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Error signing up. Please try again.');
  }
};
 */
/* export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data.status === 'ok') {
      return response.data;
    } else {
      throw new Error('Login failed. Please check your credentials.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Login error:', axiosError);
      throw new Error(axiosError.response?.data?.message || 'Error logging in. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
}; */

export const getUsers = async () => {
  try {
    const response = await api.get('/users'); // Utiliser le point de terminaison correct
    console.log('API Response:', response.data); // Affichez les données pour déboguer
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Axios error fetching users:', axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Error fetching users. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`); // Utiliser le point de terminaison correct
    if (response.data) {
      return response.data;
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error fetching user by ID:', axiosError.message);
      throw new Error('Error fetching user. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Error fetching user. Please try again.');
    }
  }
};

export const createUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/adduser', { name, email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error creating user:', axiosError.message);
      throw new Error('Error creating user. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Error creating user. Please try again.');
    }
  }
};

export const updateUser = async (id: string, data: { name: string; email: string; password: string }) => {
  try {
    const response = await api.put(`/:id`, data); // Utiliser le point de terminaison correct
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error updating user:', axiosError.message);
      throw new Error('Error updating user. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Error updating user. Please try again.');
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/:id`); // Utiliser le point de terminaison correct
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error deleting user:', axiosError.message);
      throw new Error('Error deleting user. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Error deleting user. Please try again.');
    }
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
