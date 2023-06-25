import React, {useContext} from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
// import Login from "../pages/Auth/Login/Login";
// import Signup from "../pages/Auth/Signup/Signup";
// import Profile from "../pages/Profile";
// import VehicleRegistration from "../pages/Hotelier/VehicleRegistration/VehicleRegistration";
// import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
// import { AuthContext } from "../context/authContext";

// import ComingSoon from "../pages/ComingSoon";
import Maintenance from "../pages/Maintenance";
import LayoutAccount from "../components/LayoutAccount/LayoutAccount";

import UserInfo from "../pages/UserInfo/UserInfo";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

import BookingHistory from "../pages/Customer/BookingHistory/BookingHistory";

import CreateVehicle from "../pages/Accommodation/CreateVehicle/CreateVehicle";
import RentalHistory from "../pages/Accommodation/RentalHistory/RentalHistory";

import NotFound from "../pages/NotFound/NotFound";

const UserRouter = () => {
  const { currentToken, userDecode } = useContext(AuthContext);

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

          <Route element={<LayoutAccount />}>
            {/* --------Share-------- */}
            <Route path="/my_account" element={<UserInfo />} />
            <Route path="/change_password" element={<ChangePassword />} />

            {/* --------Cusomter-------- */}
            <Route path="/booking_history" element={<BookingHistory />} />

            {/* --------Accommodation-------- */}
            <Route path="/create_vehicle" element={<CreateVehicle />} />
            <Route path="/rental_history" element={<RentalHistory />} />

            {/* --------Owner-------- */}

          </Route>

          <Route path="/forgot_password" element={<ForgotPassword/>} />
          {userDecode?.role_id?.roleName !== 'Admin' && <Route path="/*" element={<NotFound />} />}

          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/booking_history" element={<BookingHistory />} />
          <Route
            path="/vehicle_registration"
            element={<VehicleRegistration />}
          />
          <Route path="/rental_history" element={<RentalHistory />} /> */}
        </Route>
      </>
    </Routes>
  );
};

export default UserRouter;
