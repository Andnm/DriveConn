import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import VehicleListing from "../pages/VehicleListing";
import VehicleDetails from "../pages/VehicleDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import Contact from "../pages/Contact";
import Policy from "../pages/Policy";
import VehicleOwner from "../pages/VehicleOwner";

import Layout from "../components/Layout/Layout";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";
import Profile from "../pages/Profile";
import BookingHistory from "../pages/Customer/BookingHistory";
import VehicleRegistration from "../pages/Hotelier/VehicleRegistration/VehicleRegistration";
import RentalHistory from "../pages/Hotelier/RentalHistory/RentalHistory";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import { AuthContext } from "../context/authContext";

import ComingSoon from "../pages/ComingSoon";
import Maintenance from "../pages/Maintenance";

const UserRouter = () => {
  const { currentToken } = useContext(AuthContext);

  return (
    <Routes>
      <>
        {/* <Route path="/" element={<ComingSoon />} /> */}
        <Route path="/" element={<Maintenance />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/vehicle_owner" element={<VehicleOwner />} />
          <Route path="/vehicles" element={<VehicleListing />} />
          <Route path="/vehicles/:slug" element={<VehicleDetails />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/booking_history" element={<BookingHistory />} />
          <Route
            path="/vehicle_registration"
            element={<VehicleRegistration />}
          />
          <Route path="/rental_history" element={<RentalHistory />} />
        </Route>
      </>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default UserRouter;
