import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ path, element }) => {
  const { userDecode } = useContext(AuthContext);

  if (!userDecode) {
    return <Navigate to="/home" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
