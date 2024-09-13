import axios, { AxiosError } from 'axios';

// Define API base URLs
const API_URL = 'http://localhost:3000/api';
const BASE_URL = 'http://localhost:3000/CRM';
const API_URLL = 'http://localhost:3000';

// Function to get the token from local storage or cookies
const getToken = () => {
  const name = 'token=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
};


// Function to get authentication headers with the token
const getAuthHeaders = () => {
  const token = getToken();
  console.log('Token:', token); // Vérifiez ici que le token est correctement récupéré
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};
// Create an axios instance for API requests with credentials
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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

interface ErrorResponse {
  message?: string;
}

// Function to get products
export const getProducts = async () => {
  try {
    console.log('Sending request to:', `${API_URL}/get`);
    const res = await axios.get(`${API_URL}/get`, getAuthHeaders());
    console.log('Products fetched:', res.data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Error fetching products:', err.message);
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      }
    } else {
      console.error('Unexpected error:', err);
    }
    throw err;
  }
};


// Function to get a product by ID
export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/get/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching product.');
  }
};

// Function to add a review
export const addReview = async (productId: string, userId: string, rating: number, comment: string) => {
  try {
    const response = await api.post('/add-review', { productId, userId, rating, comment }, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error adding review.');
  }
};

// Function to get reviews by product ID
export const getReviews = async (productId: string) => {
  try {
    const response = await api.get(`/get-reviews/${productId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching reviews.');
  }
};

// Function to signup a user
export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/signup', { name, email, password }, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error signing up.');
  }
};

// Function to get all orders
export const getOrders = async () => {
  try {
    const response = await api.get('/orders/allorders', getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching orders.');
  }
};

// Function to place a new order
export const placeOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders/passer', orderData, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error placing order.');
  }
};

// Function to cancel an order
export const cancelOrder = async (orderId: string) => {
  try {
    const response = await api.put(`/orders/${orderId}/cancel`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error canceling order.');
  }
};

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password }, getAuthHeaders());
    if (response.data.status === 'ok') {
      return response.data;
    } else {
      throw new Error('Login failed. Please check your credentials.');
    }
  } catch (error) {
    handleAxiosError(error, 'Error logging in.');
  }
};

// Function to get all users
export const getUsers = async (role?: string) => {
  try {
    const response = await axios.get(
      `${API_URLL}/auth/getUsers${role ? `?role=${role}` : ''}`, 
      getAuthHeaders() 
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching users.');
  }
};

// Function to get a user by ID
export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${API_URLL}/auth/getuser/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Function to create a new user
export const createUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/adduser', { name, email, password }, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error creating user.');
  }
};

// Function to update a user by ID
export const updateUser = async (id: string, data: { firstName: string; lastName: string; email: string }) => {
  try {
    const response = await axios.put(`${API_URLL}/auth/updateuser/${id}`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error updating user.');
  }
};

// Example of how the function might be defined
export const updateProfile = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${API_URLL}/auth/updateuser/${id}`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error updating user.');
  }
};


// Function to get the user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Function to update the user profile
export const updateUserProfile = async (userData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/profile`, userData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to get daily trending products
export const getDailyTrendingProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/trending/daily`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching daily trending products:', error);
    throw new Error('Error fetching daily trending products');
  }
};

// Interface for Product
export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  sales: number;
}

// Function to delete a user by ID
export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URLL}/auth/deleteUser/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error deleting user.');
  }
};

// Function to block a user
export const blockUser = async (userId: string) => {
  try {
    const response = await axios.put(`${API_URLL}/auth/blockUser/${userId}`, {}, getAuthHeaders());
    console.log('Block user response:', response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error blocking user.');
    throw error; // Re-throw error to handle it further if needed
  }
};
// Function to get transactions
export const getTransactions = async () => {
  try {
    const response = await api.get('/getTransactions', getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching transactions.');
  }
};

// Function to like a product
export const likeProduct = async (userId: string) => {
  try {
    const response = await api.put(`/likeProduct/${userId}`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error liking product.');
  }
};

// Function to unlike a product
export const unlikeProduct = async (userId: string) => {
  try {
    const response = await api.put(`/unlikeProduct/${userId}`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error unliking product.');
  }
};
export const getBestSellingProducts = async (salesRepId: string) => {
  try {
    const response = await axios.get(`${API_URL}/statistics/best-selling-products`, getAuthHeaders());
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching best-selling products:', error);
    throw error;
  }
};