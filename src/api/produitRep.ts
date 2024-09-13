import axios from 'axios';
import { getToken } from '../utils/authh'; // Assurez-vous que ce chemin est correct

const API_BASE_URL = 'http://localhost:3000/products';

// Fonction pour obtenir les en-têtes d'authentification avec le token
const getAuthHeaders = () => {
  const token = getToken();
  console.log('Token:', token); // Affichez le token pour vérifier
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// Fonction pour récupérer les produits
export const getProducts = async () => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/get`);
    const res = await axios.get(`${API_BASE_URL}/get`, getAuthHeaders());
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

// Fonction pour récupérer un produit spécifique
export const getProduct = async (id: string) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/get/${id}`);
    const res = await axios.get(`${API_BASE_URL}/get/${id}`, getAuthHeaders());
    console.log('Product fetched:', res.data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Error fetching product:', err.message);
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      }
    } else {
      console.error('Unexpected error:', err);
    }
    throw err;
  }
};

// Fonction pour créer un produit
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageBase64?: string;
  gender?: 'men' | 'women' | 'kids';
  colors?: string[];
  ownerId: string; // Incluez ownerId ici
}) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/add`);
    const response = await axios.post(`${API_BASE_URL}/add`, productData, getAuthHeaders());
    console.log('Product created:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating product:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fonction pour mettre à jour un produit
export const updateProduct = async (id: string, data: {
  name?: string;
  price?: number;
  stock?: number;
  // Ajoutez d'autres propriétés si nécessaire
}) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/update/${id}`);
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, data, getAuthHeaders());
    console.log('Product updated:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating product:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fonction pour supprimer un produit
export const deleteProduct = async (id: string) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/delete/${id}`);
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, getAuthHeaders());
    console.log('Product deleted:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting product:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fonction pour obtenir les produits par propriétaire
export const getProductsByOwner = async () => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/owner-count`);
    const response = await axios.get(`${API_BASE_URL}/owner-count`, getAuthHeaders());
    console.log('Products by owner fetched:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching products by owner:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fonction pour filtrer les produits
export const filterProducts = async (filters: {
  gender?: 'men' | 'women' | 'kids';
  category?: 'all' | 'shoes' | 'clothes' | 'accessories';
  colors?: string[];
}) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/filter`);
    const response = await axios.get(`${API_BASE_URL}/filter`, {
      params: filters,
      ...getAuthHeaders(),
    });
    console.log('Filtered products fetched:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error filtering products:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fonction pour obtenir les utilisateurs
export const getUsers = async () => {
  try {
    console.log('Sending request to:', 'http://localhost:3000/getUsers');
    const response = await axios.get('http://localhost:3000/getUsers', getAuthHeaders());
    console.log('Users fetched:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching users:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fonction pour obtenir les produits les plus appréciés
export const getTopLikedProducts = async () => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/top-liked`);
    const response = await axios.get(`${API_BASE_URL}/top-liked`, getAuthHeaders());
    console.log('Top liked products fetched:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching top liked products:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const getReviews = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${id}/reviews`, getAuthHeaders());
    console.log('Product fetched:', res.data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Error fetching product:', err.message);
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      }
    } else {
      console.error('Unexpected error:', err);
    }
    throw err;
  }
};