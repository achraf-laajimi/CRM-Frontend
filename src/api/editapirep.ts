import axios from 'axios';
import { getToken } from '../utils/authh'; // Ensure this path is correct

const API_URL = 'http://localhost:3000/products/update'; // Update this URL based on your configuration

// Function to get authentication headers with the token
const getAuthHeaders = () => {
  const token = getToken(); // Get the token from the cookies or local storage
  console.log('Authorization Header:', token ? `Bearer ${token}` : 'No Token'); // Log header for debugging
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '', // Include token in Authorization header
    },
  };
};

// Function to update a product
export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product. Please try again.');
  }
};
