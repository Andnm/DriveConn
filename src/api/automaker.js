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

export const getAllCarAutomaker = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/autoMakers/cars`);
    return response;
  } catch (error) {
    console.error("Error fetching get All Car Automaker:", error);
    return error;
  }
};

export const getAllMotorbikeAutomaker = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/autoMakers/motorbikes`);
    return response;
  } catch (error) {
    console.error("Error fetching get All Motorbike Automaker:", error);
    return error;
  }
};
