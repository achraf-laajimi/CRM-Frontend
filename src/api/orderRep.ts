import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/orders';
const BPI_BASE_URL = 'http://localhost:3000/api/statistics';
// Function to fetch all orders
export const getOrders = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/allorders`);
        return res.data;
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw err;
    }
};

// Function to fetch order statistics
export const getOrderStatistics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/statistics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order statistics:', error);
        throw error;
    }
};

// Function to fetch order details by ID
export const getOrder = async (id: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/orderdetails/${id}`);
        return res.data;
    } catch (err) {
        console.error('Error fetching order details:', err);
        throw err;
    }
};

// Function to create a new order
export const createOrder = async (orderData: {
    userId: string;
    products: { productId: string; quantity: number }[];
    paymentMethod: string;
    shippingAddress: string;
}) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/passer`, orderData);
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
            params: { month, year }
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
        const response = await axios.get(`${BPI_BASE_URL}/daily-trending`);
        return response.data;
    } catch (err) {
        console.error('Error fetching daily trending products:', err);
        throw err;
    }
};

// Function to fetch the number of orders by status
export const getOrdersByStatus = async (period: string, salesRepId: string) => {
    try {
        const res = await axios.post(`${BPI_BASE_URL}/orders-by-status`, { period, salesRepId });
        return res.data;
    } catch (err) {
        console.error('Error fetching orders by status:', err);
        throw err;
    }
};

// Function to fetch best selling products by rep
export const getBestSellingProductsByRep = async (salesRepId: string) => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/best-selling-products/${salesRepId}`);
        return res.data;
    } catch (err) {
        console.error('Error fetching best selling products by rep:', err);
        throw err;
    }
};
export const getAverageRatings = async (salesRepId: string) => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/best-selling-products/${salesRepId}`);
        return res.data;
    } catch (err) {
        console.error('Error fetching best selling products by rep:', err);
        throw err;
    }
};
export const getAverageRatingForProduct = async (salesRepId: string) => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/best-selling-products/${salesRepId}`);
        return res.data;
    } catch (err) {
        console.error('Error fetching best selling products by rep:', err);
        throw err;
    }
};


// Function to fetch the total number of orders
export const getTotalOrders = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/total-orders`);
        return res.data;
    } catch (err) {
        console.error('Error fetching total orders:', err);
        throw err;
    }
};

// Function to fetch total sales
export const getTotalSales = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/total-sales`);
        return res.data;
    } catch (err) {
        console.error('Error fetching total sales:', err);
        throw err;
    }
};

// Function to fetch products by likes
export const getProductsByLikes = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/products-by-likes`);
        return res.data;
    } catch (err) {
        console.error('Error fetching products by likes:', err);
        throw err;
    }
};
export const getNewUserStatistics = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/new-users`);
        return res.data;
    } catch (err) {
        console.error('Error fetching new user statistics:', err);
        throw err;
    }
};

export const getTotalNumberAccounts = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/total-accounts`);
        return res.data;
    } catch (err) {
        console.error('Error fetching total number of accounts:', err);
        throw err;
    }
};
export const getNumberAccountsByMonth = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/total-accounts`);
        return res.data;
    } catch (err) {
        console.error('Error fetching total number of accounts:', err);
        throw err;
    }
};
export const getNumberAccountsByYear = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/total-accounts`);
        return res.data;
    } catch (err) {
        console.error('Error fetching total number of accounts:', err);
        throw err;
    }
};
export const getBestSellingProducts  = async () => {
    try {
        const res = await axios.get(`${BPI_BASE_URL}/total-accounts`);
        return res.data;
    } catch (err) {
        console.error('Error fetching total number of accounts:', err);
        throw err;
    }
};

