import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice.js";
import api from "../../../../api/axios.js";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (registerData, thunkAPI) => {
    try {
      const response = await api.post(
        `${API_URL}/auth/register`,
        registerData
      );
      return response.data;
    } catch (error) {
          const message = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyEmailThunk = createAsyncThunk(
  "/auth/verifyToken",
  async (token, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/auth/verify-account?token=${token}`);
      return response.data;
    } catch (error) {
          const message = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
)