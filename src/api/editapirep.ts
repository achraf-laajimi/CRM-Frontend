import axios from 'axios';

const API_URL = 'http://localhost:3000/products/update'; // Mettez à jour cette URL en fonction de votre configuration

export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product. Please try again.');
  }
};
