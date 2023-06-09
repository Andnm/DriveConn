import API_URL from "./Router";
import axios from "axios";

const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMotorbikesOfUser = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/motorbikes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching motorbike of user:", error);
    return null;
  }
};

export const getAllMotorbikes = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/motorbikes/home`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all motorbike:", error);
    return null;
  }
};

export const registerMotorbike = async (token, data, url) => {
  try {
    const addData = { ...data, images: [...data.images, url] };
    delete addData.transmission;

    const instance = createAxiosInstance(token);
    const response = await instance.post(`/api/motorbikes`, addData);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error register motorbike:", error);
    return error;
  }
};
