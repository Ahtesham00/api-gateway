import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TwoStepAuth from "./pages/TwoStepAuth";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout hideSidebar={true}>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/two-step-auth"
        element={
          <MainLayout hideSidebar={true}>
            <TwoStepAuth />
          </MainLayout>
        }
      />

      <Route
        path="/signup"
        element={
          <MainLayout hideSidebar={true}>
            <Signup />
          </MainLayout>
        }
      />

      <Route
        path="/home"
        element={
          <MainLayout hideSidebar={false}>
            <Home />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
