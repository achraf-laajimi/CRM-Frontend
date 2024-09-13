import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

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

export const getProducts = async () => {
  try {
        const res = await axios.get(`${API_BASE_URL}/get`, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getProduct = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get/${id}`, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getComments = async (id) => {
  try {
      const res = await axios.get(`${API_BASE_URL}/reviews/user/${id}`, getAuthHeaders());
      return res.data;
  } catch (err) {
      console.error(err);
      throw err;
  }
};

