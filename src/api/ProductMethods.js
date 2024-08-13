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

export const getProduct = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

