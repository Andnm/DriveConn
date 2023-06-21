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

export const getCarsOfUser = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/cars`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car of user:", error);
    return null;
  }
};

export const getAllCars = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/cars/home`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all car:", error);
    return null;
  }
};
