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

export const getBookingList = async (token, params = {}) => {
  const response = await axios.get(`${API_URL}/api/bookings/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response ? response.data : [];
};

export const cancelBookingById = async (token, bookingId = {}) => {
  const response = await axios.get(
    `${API_URL}/api/bookings/${bookingId}/cancel`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response ? response.data : null;
};

export const createBooking = async (
  token,
  licensePlate,
  bookingStart,
  bookingEnd
) => {
  try {
    const data = {
      licensePlate: licensePlate,
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
    };
    const instance = createAxiosInstance(token);
    const response = await instance.post("/api/bookings", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error create booking:", error);
    return [];
  }
};

export const getAllOfHotelierBookings = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get("/api/bookings/hotelier");
    return response.data;
  } catch (error) {
    console.error("Error fetching all booking of hotelier:", error);
    return [];
  }
};

export const getAllOfCustomerBookings = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get("/api/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching all booking of customer:", error);
    return [];
  }
};

export const changeBookingStatus = async (token, bookingId) => {
  try {
    const data = {
      bookingId: bookingId,
    };
    const instance = createAxiosInstance(token);
    const response = await instance.post(
      "/api/bookings/changeBookingStatus",
      data
    );
    return response;
  } catch (error) {
    console.error("Error change booking status:", error);
    return [];
  }
};

export const cancelBookingByCustomer = async (token, data) => {
  // console.log(data)
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.post("/api/bookings/cancelCustomer", data);
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error cancel booking by customer:", error);
    return error.response;
  }
};

export const cancelBookingByOwner = async (token, data) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.post("/api/bookings/cancelOwner", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error cancel booking by owner:", error);
    return error.response;
  }
};
