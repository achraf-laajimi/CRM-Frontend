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