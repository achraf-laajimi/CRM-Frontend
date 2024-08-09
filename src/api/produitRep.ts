import axios,  { AxiosError } from 'axios';

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

export const getProduct = async (id : string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
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
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add}`, productData);
      return response.data;
    } catch (error: any) { // Use 'any' to handle errors with TypeScript
      console.error('Error creating product:', error);
      throw new Error(error.response ? error.response.data.error : 'Error creating product. Please try again.');
    }
  };
  export const updateProduct = async (id: string, data: {
    name?: string;
    price?: number;
    stock?: number; // Assurez-vous que ce champ correspond à votre API
    // Ajoutez d'autres propriétés si nécessaire
  }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error updating product. Please try again.');
    }
  };
  
  export const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', "error.message");
      throw new Error('Error deleting product. Please try again.');
    }
  };
  
  export const getProductsByOwner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/owner-count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by owner:', "error.message");
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
    } catch (error) {
      console.error('Error filtering products:', "error.message");
      throw new Error('An unexpected error occurred. Please try again.');
    }
  };