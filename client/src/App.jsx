import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TwoStepAuth from "./pages/TwoStepAuth";
import KnowledgeBasePanel from "./pages/KnowledgeBasePanel";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

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

      {/* Protect this route */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <MainLayout hideSidebar={false}>
              <Home />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/knowledge-base"
        element={
          <PrivateRoute>
            <MainLayout hideSidebar={false}>
              <KnowledgeBasePanel />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
