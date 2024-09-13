// api/auth.ts

import axios, { AxiosError } from 'axios';
import { UserData, SignupResponse, LoginResponse } from '../components/signup/types'; // Assurez-vous que le chemin d'importation est correct

// API URLs
const API_LOGIN_URL = 'http://localhost:3000/auth/login';
const API_BASE_URL = 'http://localhost:3000/auth'; 

// Function to set token in cookies
export const setToken = (token: string): void => {
  document.cookie = `token=${token}; path=/dashbord`; // Adjust options as needed
};

// Function to log in a user
export const loginUser = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_LOGIN_URL, credentials);
    console.log('Login response:', response); // Debug the entire response
    const token = response.data.token; // Extract the token from the response
    console.log('Extracted Token:', token); // Ensure the token is correctly extracted
    if (token) {
      setToken(token); // Set the token in cookies
      console.log(response.data);
      return response.data; // Return the entire response data
    } else {
      console.error('Token not found in response');
      throw new Error('Token not found');
    }
  } catch (error) {
    console.error('Error logging in:', (error as any).response ? (error as any).response.data : (error as Error).message);
    throw error;
  }
};

// Function to sign up a user
interface ErrorResponse {
  message?: string;
}

export const signupUser = async (userData: UserData): Promise<any> => {
  try {
    const res = await axios.post(`${API_BASE_URL}/signup`, userData);
    return res.data;
  } catch (error) {
    // Type guard to check if error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Error signing up:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Re-throw the error for further handling
  }
};


// Function to log out a user
/* export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
    removeToken(); // Ensure you have this function defined
    // Handle post-logout UI changes or redirection
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}; */

const clearCookie = (name: string): void => {
  document.cookie = `${name}=; path=/login; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

};

export const logoutUser = async (): Promise<void> => {
  try {
    // Call the backend to perform logout if needed
    await axios.post(`${API_BASE_URL}/logout`);
    
  } catch (error) {
    console.error('Failed to log out from backend:', error);
  } finally {
    // Clear the token cookie
    clearCookie('token'); // Ensure 'token' matches the name of your cookie exactly
  }
};

export default loginUser;
