import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/get`);
    return res.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw new Error('Error fetching products. Please try again.');
  }
};

export const getProduct = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/get/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching product:', err);
    throw new Error('Error fetching product. Please try again.');
  }
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageBase64?: string;
  gender?: 'men' | 'women' | 'kids';
  colors?: string[];
  ownerId: string; // Include ownerId here
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, productData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating product:', error);
    throw new Error(error.response ? error.response.data.error : 'Error creating product. Please try again.');
  }
};

export const updateProduct = async (id: string, data: {
  name?: string;
  price?: number;
  stock?: number;
  // Add other properties if necessary
}) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product. Please try again.');
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product. Please try again.');
  }
};

export const getProductsByOwner = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/owner-count`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products by owner:', error);
    throw new Error('Error fetching products by owner. Please try again.');
  }
};

export const filterProducts = async (filters: {
  gender?: 'men' | 'women' | 'kids';
  category?: 'all' | 'shoes' | 'clothes' | 'accessories';
  colors?: string[];
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter`, { params: filters });
    return response.data;
  } catch (error: any) {
    console.error('Error filtering products:', error);
    throw new Error('Error filtering products. Please try again.');
  }
};

/* export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users. Please try again.');
  }
};
 */