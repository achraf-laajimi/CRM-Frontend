import axios from 'axios';


const API_BASE_URL = 'http://localhost:3000/auth';

const getToken = () => {
    const name = 'token=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  };
  
  
  // Function to get authentication headers with the token
  const getAuthHeaders = () => {
    const token = getToken();
    console.log('Token:', token); // Vérifiez ici que le token est correctement récupéré
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  };

export const getUsers = async () => {
  try {
        const res = await axios.get(`${API_BASE_URL}/getUsers`, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUser = async (id) => {
    if (!id || typeof id !== 'string') {
        console.error('Invalid user ID:', id);
        throw new Error('Invalid user ID');
    }
    try {
        const res = await axios.get(`${API_BASE_URL}/getUser/${id}`, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteUser = async (id) => {
  try {
        const res = await axios.delete(`${API_BASE_URL}/deleteUser/${id}`, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateUser = async (id, user) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/updateUser/${id}`, user, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const blockUser = async (id) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/blockUser/${id}`, getAuthHeaders());
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

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
      const res = await axios.post(`${API_BASE_URL}/signup`, userData);
      return res.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  export const logoutUser = async () => {
      try {
          await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
          removeToken();
          // Handle post-logout UI changes or redirection
      } catch (error) {
          console.error('Error logging out:', error);
          throw error;
      }
  };
  export default loginUser;