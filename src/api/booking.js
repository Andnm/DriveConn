import API_URL from "./Router";
import axios from "axios";

export const getBookingList = async (token, params = {}) => {
    const response = await axios.get(
        `${API_URL}/api/bookings/admin`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params,
        }
    );

    return response ? response.data : [];
};

export const cancelBookingById = async (token, bookingId = {}) => {
    const response = await axios.get(
        `${API_URL}/api/bookings/${bookingId}/cancel`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return response ? response.data : null;
};