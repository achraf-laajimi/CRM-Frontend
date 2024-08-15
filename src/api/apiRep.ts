import axios, { AxiosError } from 'axios';

// Define API base URL
const API_URL = 'http://localhost:3000/api';
const BASE_URL = 'http://localhost:3000/CRM'; // Adjust if needed
const API_URLL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface ErrorResponse {
  message?: string;
}


export const getProducts = async () => {
  try {
    const response = await api.get('/get');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching products.');
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/get/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching product.');
  }
};

export const addReview = async (productId: string, userId: string, rating: number, comment: string) => {
  try {
    const response = await api.post('/add-review', { productId, userId, rating, comment });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error adding review.');
  }
};

export const getReviews = async (productId: string) => {
  try {
    const response = await api.get(`/get-reviews/${productId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching reviews.');
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error signing up.');
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders/allorders');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching orders.');
  }
};

export const placeOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders/passer', orderData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error placing order.');
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error canceling order.');
  }
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
    handleAxiosError(error, 'Error logging in.');
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URLL}/auth/getUsers`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching users.');
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${API_URLL}/auth/getuser/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/adduser', { name, email, password });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error creating user.');
  }
};

export const updateUser = async (id: string, data: { firstName: string; lastName: string; email: string }) => {
  try {
    const response = await axios.put(`${API_URLL}/auth/updateuser/${id}`,data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error updating user.');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update the logged-in user's profile
export const updateUserProfile = async (userData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/profile`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
export const getDailyTrendingProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/trending/daily`);
    return response.data;
  } catch (error) {
    console.error('Error fetching daily trending products:', error);
    throw new Error('Error fetching daily trending products');
  }
};


export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  sales: number; // Ajoutez ce champ si vous souhaitez l'utiliser
}

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URLL}/auth/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error deleting user.');
  }
};

export const blockUser = async (userId: string) => {
  try {
    const response = await axios.put(`${API_URLL}/auth/blockUser/${userId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error blocking user.');
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/getTransactions');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching transactions.');
  }
};

// Helper function to handle Axios errors
const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('Axios error:', axiosError.message);
    throw new Error(axiosError.response?.data?.message || defaultMessage);
  } else {
    console.error('Unexpected error:', error);
    throw new Error(defaultMessage);
  }
};
export const likeProduct = async (userId: string) => {
  try {
    const response = await api.put(`/blockUser/${userId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error blocking user.');
  }
};
export const unlikeProduct = async (userId: string) => {
  try {
    const response = await api.put(`/blockUser/${userId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error blocking user.');
  }
};

export const getBestSellingProducts = async (salesRepId: string) => {
  try {
    const response = await axios.get(`${API_URL}/statistics/best-selling-products`);
    console.log('API Response:', response.data); // Log the response data
    return response.data; // Ensure this matches the expected structure
  } catch (error) {
    console.error('Error fetching best-selling products:', error);
    throw error;
  }
};