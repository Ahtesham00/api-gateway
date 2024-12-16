import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { createSlice } from "@reduxjs/toolkit";

// Define the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    access_token: null,
    refresh_token: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setTokens: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    clearAuth: (state) => {
      state.email = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setEmail, setTokens, clearAuth } = authSlice.actions;

// Persist configuration for auth slice
const persistConfig = {
  key: "auth", // Key under which state will be stored in localStorage
  storage,
};

// Apply persistence to the auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use the persisted reducer
  },
});

export const persistor = persistStore(store); // Create the persistor

export default store;
