import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import LayoutAdmin from "../components/Admin/LayoutAdmin/LayoutAdmin";
import VehicleManagement from "../pages/Admin/VehicleManagement";
import BlogManagement from "../pages/Admin/BlogManagement";
import UserManagement from "../pages/Admin/UserManagement";
import WelcomeAdmin from "../pages/Admin/WelcomeAdmin";
import BookingManagement from "../pages/Admin/BookingManagement";
import Dashboard from "../pages/Admin/Dashboard";
import DrivingLicenseManagement from '../pages/Admin/DrivingLicenseManagement'
import ChatBoxManagement from "../pages/Admin/ChatBoxManagement"; 

import { AuthContext } from "../context/authContext";
import FeedbackManagement from "../pages/Admin/FeedbackManagement";

const AdminRouter = () => {
  const { currentToken } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/admin/*">
        <>
          <Route element={<LayoutAdmin />}>
            <Route path="" element={<WelcomeAdmin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vehicle_management" element={<VehicleManagement />} />
            <Route path="blog_management" element={<BlogManagement />} />
            <Route path="user_management" element={<UserManagement />} />
            <Route path="booking_management" element={<BookingManagement />} />
            <Route path="drivingLicense_management" element={<DrivingLicenseManagement />} />
            <Route path="chat_management" element={<ChatBoxManagement />} />
            <Route path="feedback_management" element={<FeedbackManagement />}/>
          </Route>
        </>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
