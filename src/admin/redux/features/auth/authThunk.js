import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice.js";
import axios from "axios";
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
      console.log(response.data) ;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
