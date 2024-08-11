import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/orders';

// Fonction pour récupérer toutes les commandes
export const getOrders = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/allorders`);
        return res.data; // Assurez-vous de retourner les données correctement
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const getOrderStatistics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/statistics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order statistics:', error);
      throw error;
    }
  };
// Fonction pour récupérer les détails d'une commande par ID
export const getOrder = async (id: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/orderdetails/${id}`);
        return res.data; // Assurez-vous de retourner les données correctement
    } catch (err) {
        console.error(err);
        throw err;
    }
};
