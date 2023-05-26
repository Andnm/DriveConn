import API_URL from "./Router";
import axios from "axios";

export const getVehicleList = async (token, params = {}) => {
    const response = await axios.get(
        `${API_URL}/api/vehicles/home`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params,
        }
    );

    return response ? response.data : [];
};