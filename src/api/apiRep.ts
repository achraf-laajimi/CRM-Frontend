import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/CRM';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface ErrorResponse {
  message?: string;
}
export const getProducts = async () => {
  try {
    const response = await api.get('/get'); // Utilisation correcte de api
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error fetching products:', axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Error fetching products. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/get/${id}`); // Utilisation correcte de api et inclusion de l'ID
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error fetching product:', axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Error fetching product. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};



export const addReview = async (productId: string, userId: string, rating: number, comment: string) => {
  try {
    const response = await api.post('/add-review', { productId, userId, rating, comment });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error adding review:', axiosError.message);
      throw new Error('Error adding review. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export const getReviews = async (productId: string) => {
  try {
    const response = await api.get(`/get-reviews/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error fetching reviews:', axiosError.message);
      throw new Error('Error fetching reviews. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};


export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Error signing up. Please try again.');
  }
};
export const getOrders = async () => {
  const response = await axios.get('/orders/allorders');
  return response.data;
};

export const placeOrder = async (orderData: any) => {
  const response = await axios.post('/orders/passer', orderData);
  return response.data;
};

export const cancelOrder = async (orderId: string) => {
  const response = await axios.put(`${API_URL}/${orderId}/cancel`);
  return response.data;
};
export const loginUser = async (email: string, password: string) => {
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
}; 

export const getUsers = async () => {
  try {
    const response = await api.get('/getUsers'); // Utiliser le point de terminaison correct
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
    const response = await api.get(`/getUser/${id}`); // Utiliser le point de terminaison correct
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

export const updateUser = async (id: string, data: { username: string; email: string}) => {
  try {
    const response = await api.put(`/updateUser/${id}`, data); // Utiliser le point de terminaison correct
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
    const response = await api.delete(`/deleteUser/${id}`); // Utiliser le point de terminaison correct
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
export const blockUser = async (userId: string) => {
  return await axios.put(`${API_URL}/blockUser/${userId}`);
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/getTransactions'); // Assurez-vous que ce point de terminaison est correct
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
