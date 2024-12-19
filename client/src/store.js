import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { createSlice } from "@reduxjs/toolkit";

// =================== Auth Slice ===================
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

// =================== Sidebar Slice ===================
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    selectedKey: "1", // Default selected key
  },
  reducers: {
    setSelectedSidebarKey: (state, action) => {
      state.selectedKey = action.payload;
    },
  },
});

export const { setSelectedSidebarKey } = sidebarSlice.actions;

// =================== Persist Configuration ===================
const authPersistConfig = {
  key: "auth",
  storage,
};

const sidebarPersistConfig = {
  key: "sidebar",
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const persistedSidebarReducer = persistReducer(sidebarPersistConfig, sidebarSlice.reducer);

// =================== Store Configuration ===================
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,       // Persisted auth state
    sidebar: persistedSidebarReducer, // Persisted sidebar state
  },
});

export const persistor = persistStore(store); // Create the persistor

export default store;
