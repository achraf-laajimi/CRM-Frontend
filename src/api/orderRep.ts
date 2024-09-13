import axios from 'axios';
import { getToken } from '../utils/authh'; // Ensure this path is correct

const API_BASE_URL = 'http://localhost:3000/orders';
const BPI_BASE_URL = 'http://localhost:3000/api/statistics';

// Function to get authentication headers with the token
const getAuthHeaders = () => {
  const token = getToken(); // Get the token from the cookies
  console.log('Authorization Header:', token ? `Bearer ${token}` : 'No Token'); // Log header for debugging
  return {
    headers: {
        Authorization: token ? `Bearer ${token}` : '', // Include token in Authorization header
    },
  };
};

// Function to fetch all orders
export const getOrders = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/allorders`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching orders:', err);
    throw err;
  }
};

// Function to fetch order statistics
export const getOrderStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    throw error;
  }
};

// Function to fetch order details by ID
export const getOrder = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/orderdetails/${id}`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching order details:', err);
    throw err;
  }
};

// Function to create a new order
// Function to create an order
export const createOrder = async (orderData: {
    userId: string;
    products: { productId: string; quantity: number }[];
    paymentMethod: string;
    shippingAddress: string;
}) => {
    try {
        const res = await axios.post(`http://localhost:3000/orders/passer`, orderData, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error('Error placing order:', err);
        throw err;
    }
};
// Function to fetch monthly income by rep ID
export const getMonthlyIncomeByRepId = async (repId: string, month?: number, year?: number) => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/monthly-income/${repId}`, {
      params: { month, year },
      ...getAuthHeaders(), // Add auth headers
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching monthly income by rep ID:', err);
    throw err;
  }
};

// Function to fetch the 3 most popular products of the day
export const getDailyTrendingProducts = async () => {
  try {
    const response = await axios.get(`${BPI_BASE_URL}/daily-trending`, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error('Error fetching daily trending products:', err);
    throw err;
  }
};

// Function to fetch the number of orders by status
export const getOrdersByStatus = async (period: string, salesRepId: string) => {
  try {
    const res = await axios.post(`${BPI_BASE_URL}/orders-by-status`, { period, salesRepId }, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching orders by status:', err);
    throw err;
  }
};

// Function to fetch best selling products by rep
export const getBestSellingProductsByRep = async (salesRepId: string) => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/best-selling-products/${salesRepId}`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching best selling products by rep:', err);
    throw err;
  }
};

// Function to fetch average ratings
export const getAverageRatings = async (salesRepId: string) => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/average-ratings/${salesRepId}`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching average ratings:', err);
    throw err;
  }
};

// Function to fetch average rating for a product
export const getAverageRatingForProduct = async (productId: string) => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/average-rating/${productId}`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching average rating for product:', err);
    throw err;
  }
};

// Function to fetch the total number of orders
export const getTotalOrders = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/total-orders`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching total orders:', err);
    throw err;
  }
};

// Function to fetch total sales
export const getTotalSales = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/total-sales`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching total sales:', err);
    throw err;
  }
};

// Function to fetch products by likes
export const getProductsByLikes = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/products-by-likes`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching products by likes:', err);
    throw err;
  }
};

// Function to fetch new user statistics
export const getNewUserStatistics = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/new-users`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching new user statistics:', err);
    throw err;
  }
};

// Function to fetch total number of accounts
export const getTotalNumberAccounts = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/total-accounts`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching total number of accounts:', err);
    throw err;
  }
};

// Function to fetch number of accounts by month
export const getNumberAccountsByMonth = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/number-accounts-by-month`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching number of accounts by month:', err);
    throw err;
  }
};

// Function to fetch number of accounts by year
export const getNumberAccountsByYear = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/number-accounts-by-year`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching number of accounts by year:', err);
    throw err;
  }
};

// Function to fetch best selling products
export const getBestSellingProducts = async () => {
  try {
    const res = await axios.get(`${BPI_BASE_URL}/best-selling-products`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching best selling products:', err);
    throw err;
  }
};


export const getOrdersByClientId = async (_id: string) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/client/${_id}`, getAuthHeaders());
      return res.data;
    
    } catch (err) {
      console.error('Error fetching orders:', err);
      throw err;
    }
  };