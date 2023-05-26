import API_URL from "./Router";
import axios from "axios";

export const getUserList = async (token, params = {}) => {
    const response = await axios.get(
        `${API_URL}/api/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params,
        }
    );

    return response ? response.data : [];
};

export const deleteUserById = async (token, userId) => {
    const response = await axios.delete(
        `${API_URL}/api/users/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return response ? response.data : null;
};

export const blockUserById = async (token, userId) => {
    const response = await axios.get(
        `${API_URL}/api/users/blocked/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return response ? response.data : null;
};

export const upRole = async (token, userId) => {
    const response = await axios.get(
        `${API_URL}/api/users/upRole/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return response ? response.data : null;
};