import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice";
import axios from "axios";

export const fetchPlaces = createAsyncThunk(
  "fullform/fetchPlaces",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/places`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error al obtener lugares"
      );
    }
  }
);

