
// Fonction pour obtenir les en-têtes d'authentification avec le token
import axios from 'axios';
import { getToken } from '../utils/authh'; // Assurez-vous que ce chemin est correct

const API_BASE_URL = 'http://localhost:3000/products';

// Fonction pour obtenir les en-têtes d'authentification avec le token
const getAuthHeaders = () => {
  const token = getToken(); // Obtenez le token depuis les cookies
  console.log('Authorization Header:', token ? `Bearer ${token}` : 'No Token'); // Affichez l'en-tête pour vérifier
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '', // Incluez le token dans l'en-tête Authorization
    },
  };
};

// Fonction pour récupérer les produits
export const getProducts = async () => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/get`); // Affichez l'URL de la requête
    const res = await axios.get(`${API_BASE_URL}/get`, getAuthHeaders());
    console.log('Products fetched:', res.data); // Affichez les données récupérées
    return res.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

// Function to like a product
export const likeProduct = async (productId, userId) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/${productId}/like`,
      { userId },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error('Error liking product:', err);
    throw err;
  }
};

// Function to unlike a product
// Fonction pour ne plus aimer un produit
export const unlikeProduct = async (productId, userId) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/${productId}/unlike`,
      { userId },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error('Error unliking product:', err.response ? err.response.data : err.message);
    throw err;
  }
};



// Function to add a review
export const addReview = async (productId, review) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/add-review`,
      { productId, ...review },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error('Error adding review:', err);
    throw err;
  }
};

// Function to get reviews for a product
export const getReviews = async (productId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/${productId}/reviews`,
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error('Error fetching reviews:', err);
    throw err;
  }
};
