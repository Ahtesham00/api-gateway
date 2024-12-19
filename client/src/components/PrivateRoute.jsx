import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { access_token } = useSelector((state) => state.auth);

  // If no access token, redirect to login
  return access_token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
