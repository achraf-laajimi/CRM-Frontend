import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/auth';

export const getUsers = async () => {
  try {
        const res = await axios.get(API_BASE_URL);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUser = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/getUser/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteUser = async (id) => {
  try {
        const res = await axios.delete(`${API_BASE_URL}/deleteUser/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateUser = async (id, user) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/updateUser/${id}`, user);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const blockUser = async (id) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/blockUser/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}