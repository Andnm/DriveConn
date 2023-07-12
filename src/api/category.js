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

export const getAllCarCategories = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/categories/cars`);
    return response;
  } catch (error) {
    console.error("Error fetching get All Car categories:", error);
    return error;
  }
};

export const getAllMotorbikeCategories = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/categories/motorbikes`);
    return response;
  } catch (error) {
    console.error("Error fetching get All Motorbike categories:", error);
    return error;
  }
};
