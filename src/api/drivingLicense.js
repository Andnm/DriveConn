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

export const getDrivingLicense = async (token, user_id) => {
  try {
    const instance = createAxiosInstance(token)
    const response = await instance.get(`/api/users/drivingLicense/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching driving license:", error.response);
    return [];
  }
};

export const registerDrivingLicense = async (token, 
  licenseNo,
  licenseClass,
  expireDate,
  image
) => {
  try {
    const data = {
      licenseNo: licenseNo,
      licenseClass: licenseClass,
      expireDate: expireDate,
      image: image
    };
    const instance = createAxiosInstance(token)
    const response = await instance.post("/api/users/drivingLicense", data);
    return response.data;
  } catch (error) {
    console.error("Error create driving license:", error);
    return [];
  }
};
