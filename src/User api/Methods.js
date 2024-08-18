import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

export const getProducts = async () => {
  try {
        const res = await axios.get(`${API_BASE_URL}/get`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const likeProduct = async (productId, userId) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/${productId}/like`, { userId });
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
export const unlikeProduct = async (productId, userId) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/${productId}/unlike`, { userId });
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  