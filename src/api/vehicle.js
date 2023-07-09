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

export const getVehicleList = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/vehicles/home`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all vehicles:", error);
    return null;
  }
};

export const getVehicleListOfUser = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/vehicles/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all vehicles of user:", error);
    return null;
  }
};
