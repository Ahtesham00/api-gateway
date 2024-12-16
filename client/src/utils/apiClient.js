import axios from "axios";
import store from "../store"; // Import Redux store
import { setTokens, clearAuth } from "../store";

const apiClient = axios.create({
  baseURL: "/v1",
});

// Attach Authorization header to requests
apiClient.interceptors.request.use((config) => {
  const { access_token } = store.getState().auth;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

// Handle token refresh on 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { refresh_token } = store.getState().auth;

      if (refresh_token) {
        try {
          const response = await axios.post("/v1/auth/refresh", {
            refresh_token,
          });

          // Save new tokens
          const { access_token, refresh_token: newRefreshToken } = response.data;
          store.dispatch(setTokens({ access_token, refresh_token: newRefreshToken }));

          // Retry original request with new token
          error.config.headers.Authorization = `Bearer ${access_token}`;
          return apiClient.request(error.config);
        } catch (refreshError) {
          store.dispatch(clearAuth()); // Clear auth on refresh failure
          window.location.href = "/login"; // Redirect to login
        }
      } else {
        store.dispatch(clearAuth()); // Clear auth if no refresh token
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
