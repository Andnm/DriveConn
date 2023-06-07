import axios from "axios";

const api_province_url = "https://vapi.vnappmob.com/api/province/";

export const getApiPublicProvinces = async () => {
  const response = await axios.get(api_province_url);
  return response ? response.data.results : [];
};

export const getApiPublicDistricts = async () => {
  const response = await axios.get(api_province_url);
  return response ? response.data.results : [];
};

export const getApiPublicWards = async () => {
  const response = await axios.get(api_province_url);
  return response ? response.data.results : [];
};
