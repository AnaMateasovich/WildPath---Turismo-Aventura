import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice";
import axios from "axios";

export const fetchEnterprises = createAsyncThunk(
  "fetch/enterprises",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/enterprises`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error al obtener las empresas"
      );
    }
  }
);
