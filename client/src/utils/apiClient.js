import axios from "axios";
import store from "../store"; // Import Redux store
import { setTokens, clearAuth } from "../store"; // Redux actions
import { message } from "antd";

const apiClient = axios.create({
  baseURL: "/v1", // Base URL for the API
});

// Request Interceptor: Attach the access_token to requests
apiClient.interceptors.request.use(
  (config) => {
    const { access_token } = store.getState().auth;
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle access token expiration
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  async (error) => {
    const originalRequest = error.config;

    // If the response is 401 (Unauthorized) and the request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      const { refresh_token } = store.getState().auth;

      if (refresh_token) {
        try {
          console.log("Attempting to refresh token...");

          // Make a request to refresh the token endpoint
          const refreshResponse = await axios.post(
            "/v1/auth/refresh-token",
            {}, // Empty payload
            {
              headers: {
                Authorization: `Bearer ${refresh_token}`, // Send refresh_token as Bearer
              },
            }
          );

          console.log("Refresh Token Response:", refreshResponse);

          // Extract new tokens from the data object
          const { access_token, refresh_token: newRefreshToken } = refreshResponse.data.data;

          console.log("New tokens received:", { access_token, newRefreshToken });

          // Update Redux store with new tokens
          store.dispatch(setTokens({ access_token, refresh_token: newRefreshToken }));

          // Update tokens in localStorage
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", newRefreshToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          // Refresh token failed; clear state and redirect to login
          store.dispatch(clearAuth());
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          message.error("Session expired. Please log in again.");
          window.location.href = "/"; // Redirect to login
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available; log the user out
        store.dispatch(clearAuth());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        message.error("Session expired. Please log in again.");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
