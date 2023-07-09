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

export const getUserList = async (token, params = {}) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get("/api/users", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
};

export const getUserProfileById = async (token, userId) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const checkUserPassword = async (token, userId, password) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.post(
      `/api/users/checkOldPassword/${userId}`,
      { password }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error check old password:", error);
    return false;
  }
};

export const changeUserPassword = async (token, userId, data) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.put(`/api/users/changePassword/${userId}`, {
      ...data,
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error change password:", error);
    return false;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const data = {
      email: email,
    };
    const response = await axios.post(
      `${API_URL}/api/users/forgotPassword`,
      data
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error check email exist: ", error);
    return false;
  }
};

export const confirmOtpHandle = async (email, otp) => {
  try {
    const data = {
      email: email,
      otp: otp,
    };

    const response = await axios.post(
      `${API_URL}/api/users/resetPassword`,
      data
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error confirm otp: ", error);
    return false;
  }
};

export const deleteUserById = async (token, userId) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

export const blockUserById = async (token, userId) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/users/blocked/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error blocking user:", error);
    return null;
  }
};

export const upRole = async (token, userId) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/api/users/upRole/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    return null;
  }
};

export const updateProfileImage = async (token, url) => {
  console.log(url);
  try {
    const data = {
      imgURL: url,
    };
    const instance = createAxiosInstance(token);
    const response = await instance.put(`/api/users/avatar`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error updating user profile image:", error);
    return null;
  }
};

export const updateProfileUser = async (token, user_id, data) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.put(`/api/users/${user_id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating profile user:", error);
    return error.response;
  }
};

export const sendMailWhenRegisterOwner = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/sendMailWhenRegisterOwner`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error to send email register owner: ", error);
    return null;
  }
};

export const registerAccount = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, data);
    return response;
  } catch (error) {
    console.error("Error to create account: ", error);
    return null;
  }
};

export const sendOtpWhenRegister = async (email) => {
  try {
    const data = {
      email: email,
    };
    const response = await axios.post(`${API_URL}/api/users/otpRegister`, data);
    return response;
  } catch (error) {
    // console.error("Error to send otp register account: ", error)
    return error.response;
  }
};

export const verifyOtpWhenRegister = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/verifyOtpRegister`,
      data
    );
    return response;
  } catch (error) {
    // console.error("Error to verify otp register account: ", error)
    return error.response;
  }
};
