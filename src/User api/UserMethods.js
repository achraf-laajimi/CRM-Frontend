import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/auth';

export const getUser = async (userId, token) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/getUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateUser = async (userId, updateData, token) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/updateUser/${userId}`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
