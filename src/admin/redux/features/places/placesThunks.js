import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice";
import axios from "axios";
import api from "../../../../api/axios";

export const fetchPlaces = createAsyncThunk(
  "fullform/fetchPlaces",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/all/places`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error al obtener lugares"
      );
    }
  }
);

