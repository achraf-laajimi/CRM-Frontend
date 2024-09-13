import axios from 'axios';

const API_LOGIN_URL = 'http://localhost:3000/auth/login'; 
const API_SIGNUP_URL = 'http://localhost:3000/auth/signup';
// utils/auth.js
const API_BASE_URL = 'http://localhost:3000/auth'; 



// Function to set token in cookies
export const setToken = (token) => {
  document.cookie = `token=${token}; path=/`; // Adjust options as needed
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', credentials);
    console.log('Login response:', response); // Debug the entire response
    const token = response.data.token; // Extract the token from the response
    console.log('Extracted Token:', token); // Ensure the token is correctly extracted
    if (token) {
      setToken(token); // Set the token in cookies
      console.log(response.data)
      return response.data; // Return the entire response data
      
    } else {
      console.error('Token not found in response');
      throw new Error('Token not found');
    }
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const signupUser = async (userData) => {
  try {
    const res = await axios.post(API_SIGNUP_URL, userData);
    return res.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

const clearCookie = (name)=> {
  document.cookie = `${name}=; path=/login; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

};

export const logoutUser = async () => {
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