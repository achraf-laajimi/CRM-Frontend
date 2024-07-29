
import axios from 'axios';



const API_LOGIN_URL = 'http://localhost:3000/auth/login'; 
const API_SIGNUP_URL = 'http://localhost:3000/auth/signup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (userData: any) => {
  try {
    console.log('Logging in with:', userData);
    const res = await axios.post(API_LOGIN_URL, userData);
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signupUser = async (userData: any) => {
  try {
    const res = await axios.post(API_SIGNUP_URL, userData);
    return res.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
export {};