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

export const getAllCarModels= async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/models/cars`);
    return response;
  } catch (error) {
    console.error("Error fetching get All Car models:", error);
    return error;
  }
};

export const getAllMotorbikeModels = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/models/motorbikes`);
    return response;
  } catch (error) {
    console.error("Error fetching get All Motorbike models:", error);
    return error;
  }
};
