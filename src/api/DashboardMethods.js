import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/statistics';

export const getNumberAccountsByMonth = async () => {
    try {
          const res = await axios.get(`${API_BASE_URL}/accounts-by-month`);
          return res.data;
      } catch (err) {
          console.error(err);
          throw err;
      }
};
export const getNumberOrdersByMonth = async () => {
    try {
          const res = await axios.get(`${API_BASE_URL}/orders-by-month`);
          return res.data;
      } catch (err) {
          console.error(err);
          throw err;
      }
};
export const getMonthlyIncome = async () => {
    try {
          const res = await axios.get(`${API_BASE_URL}/income/monthly`);
          return res.data;
      } catch (err) {
          console.error(err);
          throw err;
      }
};

