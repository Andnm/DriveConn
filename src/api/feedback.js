import axios from "axios";
import API_URL from "./Router";

const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createFeedbacks = async (token, data) => {
  try {
    const instance = createAxiosInstance(token)
    const response = await instance.post(`/api/feedbacks`, data);
    return response;
  } catch (error) {
    return [];
  }
};

export const getFeedbacks = async (token) => {
  try {
    const instance = createAxiosInstance(token)
    const response = await instance.get(`/api/feedbacks`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateNewFeedback = async (token, id) => {
  try {
    const data = {
        feedback_id: id
    }
    const instance = createAxiosInstance(token)
    const response = await instance.put(`/api/feedbacks`, data);
    return response.data;
  } catch (error) {
    return [];
  }
};
