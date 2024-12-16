import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { access_token } = useSelector((state) => state.auth);

  // Redirect to login if no access token
  return access_token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
