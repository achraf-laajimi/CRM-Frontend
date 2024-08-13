import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/orders';

export const getOrders = async () => {
  try {
        const res = await axios.get(`${API_BASE_URL}/allorders`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getOrder = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/orderdetails/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
