import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../FullFormCreate/formSlice";

//thunk para obtener categorias
export const fetchCategories = createAsyncThunk(
  "fullform/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error al obtener categorías"
      );
    }
  }
);
